<script setup>
import { ref, onMounted, nextTick, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
import matter from 'gray-matter'

import BaseSection from '../components/BaseSection.vue'

import { onClickOutside, useIntersectionObserver } from '@vueuse/core'

import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import frontMatter from 'markdown-it-front-matter'
import Prism from 'prismjs'
import 'prism-themes/themes/prism-gruvbox-dark.css'
import 'prismjs/components/prism-python'
import YAML from 'yaml'

const route = useRoute()
const project = ref()
const headings = ref([])
const metadata = ref({
    title: '',
    tags: [],
})
const activeId = ref(null)

const target = useTemplateRef('page-nav')
const open = ref(false)

onClickOutside(target, (event) => (open.value = false))

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight(code, lang) {
        if (lang && Prism.languages[lang]) {
            return `<pre class="language-${lang}"><code>${Prism.highlight(
                code,
                Prism.languages[lang],
                lang
            )}</code></pre>`
        }
        return `<pre><code>${md.utils.escapeHtml(code)}</code></pre>`
    },
})

md.use(anchor, {
    level: 2,
    slugify: (s) =>
        s
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-'),
})

md.use(frontMatter, (fm) => {
    metadata.value = YAML.parse(fm)
})

onMounted(async () => {
    try {
        const res = await fetch(import.meta.env.BASE_URL + `projects/${route.params.title}.md`)
        if (!res.ok) throw new Error('Failed to load project md')
        const raw = await res.text()
        // const { content, data } = matter(raw)

        // Store metadata
        // metadata.value = data
        project.value = md.render(raw)

        await nextTick()

        // const doc = new DOMParser().parseFromString(project.value, 'text/html')
        const elements = Array.from(document.querySelectorAll('h2'))

        // Store heading for TOC
        headings.value = elements.map((h) => ({
            id: h.id,
            text: h.textContent,
        }))

        // Use VueUse IntersectionObserver for each heading
        elements.forEach((el) => {
            useIntersectionObserver(
                el,
                ([{ isIntersecting }]) => {
                    if (isIntersecting) activeId.value = el.id
                },
                {
                    root: null,
                    rootMargin: '-30% 0px -60% 0px',
                    threshold: 0,
                }
            )
        })
    } catch (e) {
        console.error('Failed to load projects:', e)
    }
})
</script>

<template>
    <BaseSection class="md:pt-20 pt-0">
        <RouterLink to="/projects" class="bg-primary-dark">← Back to projects </RouterLink>
        <div class="flex flex-col gap-8 relative markdown">
            <!-- Project metadata -->
            <div>
                <h1 v-if="metadata.title">
                    {{ metadata.title }}
                </h1>
                <div v-if="metadata.tags" class="flex gap-2">
                    <code v-for="tag in metadata.tags" :key="tag">{{ tag }}</code>
                </div>
            </div>
            <!-- lg:grid-cols-[1fr_260px] -->
            <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8 relative">
                <!-- Markdown content -->
                <div class="grow">
                    <div v-if="project" v-html="project" />
                </div>
                <!-- Table of contents -->
                <aside
                    v-if="headings.length"
                    class="order-first lg:order-last lg:sticky top-32 self-start flex-none"
                >
                    <!-- <p class="text-sm uppercase opacity-60">On this page</p> -->
                    <ul class="flex flex-col gap-2 text-base">
                        <li
                            v-for="h in headings"
                            :key="h.id"
                            class="relative flex items-center gap-2"
                        >
                            <div class="relative size-5 items-center justify-center flex">
                                <span
                                    class="block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out absolute"
                                    :class="{ 'rotate-45 bg-orange': activeId === h.id }"
                                ></span>
                                <span
                                    class="block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out absolute"
                                    :class="{ '-rotate-45 bg-orange': activeId === h.id }"
                                ></span>
                            </div>
                            <RouterLink
                                :to="{ hash: `#${h.id}` }"
                                :class="[
                                    'transition block pl-5',
                                    activeId === h.id
                                        ? 'text-primary'
                                        : 'opacity-60 hover:opacity-100',
                                ]"
                            >
                                {{ h.text }}
                            </RouterLink>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    </BaseSection>
</template>
