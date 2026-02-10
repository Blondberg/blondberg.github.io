<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import BaseSection from '../components/BaseSection.vue'

import MarkdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'
import anchor from 'markdown-it-anchor'

const route = useRoute()
const project = ref()
const headings = ref([])

let md

onMounted(async () => {
    try {
        md = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true,
        })

        md.use(
            await Shiki({
                themes: {
                    light: 'vitesse-dark',
                },
            })
        )

        md.use(anchor, {
            level: [1, 2],
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
    <BaseSection class="pt-6">
        <RouterLink to="/projects" class="">← Back to projects </RouterLink>
        <div class="flex gap-10 flex-col">
            <!-- Navigation -->
            <!-- <aside v-if="headings.length" class="w-64 top-24">
                <p class="text-sm uppercase tracking-wide opacity-60 mb-3">On this page</p>
                <ul class="flex flex-col gap-2 text-sm">
                    <li v-for="h in headings" :key="h.id">
                        <RouterLink
                            v-for="h in headings"
                            :key="h.id"
                            :to="{ hash: `#${h.id}` }"
                            class="hover:underline opacity-80 hover:opacity-100 transition block"
                        >
                            {{ h.text }}
                        </RouterLink>
                    </li>
                </ul>
            </aside> -->
            <div class="markdown" v-if="project" v-html="project"></div>
            <div v-else class="animate-pulse opacity-70">Loading project…</div>
        </div>
    </BaseSection>
</template>
