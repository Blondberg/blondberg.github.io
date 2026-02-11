<script setup>
import { ref, onMounted, nextTick, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
import BaseSection from '../components/BaseSection.vue'

import { onClickOutside } from '@vueuse/core'

import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import Prism from 'prismjs'
import 'prism-themes/themes/prism-gruvbox-dark.css'
import 'prismjs/components/prism-python'

const route = useRoute()
const project = ref()
const headings = ref([])

const target = useTemplateRef('page-nav')
const open = ref(false)

onClickOutside(target, (event) => (open.value = false))

let md

onMounted(async () => {
    try {
        md = new MarkdownIt({
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

        const res = await fetch(import.meta.env.BASE_URL + `projects/${route.params.title}.md`)
        if (!res.ok) throw new Error('Failed to load project md')
        const raw = await res.text()
        project.value = md.render(raw)

        await nextTick()

        const doc = new DOMParser().parseFromString(project.value, 'text/html')
        headings.value = [...doc.querySelectorAll('h2')].map((h) => ({
            id: h.id,
            text: h.textContent,
        }))
    } catch (e) {
        console.error('Failed to load projects:', e)
    }
})
</script>

<template>
    <!-- Navigation section -->
    <div
        ref="page-nav"
        class="flex flex-row items-center justify-between md:relative sticky md:mx-auto md:mt-20 bg-primary px-8 top-0 py-3 border-b md:border-none md:max-w-[1200px]"
    >
        <RouterLink to="/projects" class="">← Back to projects </RouterLink>

        <!-- Navigation -->
        <p class="lg:hidden text-sm uppercase opacity-60 cursor-pointer" @click="open = !open">
            On this page
        </p>
        <div class="absolute top-full pt-3 w-full px-8 flex left-0 items-center justify-center">
            <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
            >
                <aside
                    v-if="headings.length && open"
                    class="lg:hidden text-right border-purple/15 flex-1 p-3 rounded mx-auto border bg-primary"
                >
                    <ul class="flex flex-col items-end gap-2 text-sm">
                        <RouterLink
                            v-for="h in headings"
                            :key="h.id"
                            :to="{ hash: `#${h.id}` }"
                            @click="open = false"
                            class="hover:underline w-fit opacity-80 hover:opacity-100 transition block"
                        >
                            {{ h.text }}
                        </RouterLink>
                    </ul>
                </aside>
            </Transition>
        </div>
    </div>
    <BaseSection class="pt-0">
        <div class="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
            <div class="markdown" v-if="project" v-html="project"></div>

            <aside
                v-if="headings.length"
                class="hidden lg:block sticky top-64 self-start border-purple/15 p-4 rounded border bg-primary"
            >
                <p class="text-sm uppercase opacity-60">On this page</p>
                <ul class="flex flex-col gap-2 text-sm">
                    <RouterLink
                        v-for="h in headings"
                        :key="h.id"
                        :to="{ hash: `#${h.id}` }"
                        class="hover:underline opacity-80 hover:opacity-100 transition block"
                    >
                        {{ h.text }}
                    </RouterLink>
                </ul>
            </aside>
        </div>
    </BaseSection>
</template>
