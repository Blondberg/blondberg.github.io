<script setup>
import BaseSection from './BaseSection.vue'
import ProjectCard from './ProjectCard.vue'

import { ref, onMounted } from 'vue'

const sectionRef = ref(null)
const projects = ref([])

const projectColors = [
    'border-orange hover:bg-orange',
    'border-purple hover:bg-purple',
    'border-satwhite hover:bg-satwhite',
    'border-pink hover:bg-pink',
]

defineExpose({
    sectionRef,
})

onMounted(async () => {
    try {
        const res = await fetch('/projects.json')
        if (!res.ok) throw new Error('Failed to load projects')
        projects.value = await res.json()
    } catch (e) {
        console.error(e)
    }
})
</script>

<template>
    <BaseSection ref="sectionRef" header="Projects" subheader="A highlight.">
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-8">
            <ProjectCard
                v-for="(project, index) in projects.slice(0, 4)"
                :key="index"
                :description="project.description"
                :title="project.title"
                :subtitle="project.subtitle"
                :ltr="index % 2 == 0"
                :technologies="project.technologies"
                :imagePath="project.imagePath"
                :color="projectColors[index]"
                :git="project.git"
                :svg="project.svg"
            >
            </ProjectCard>
        </div>
        <div class="self-end">
            <RouterLink to="/projects">View more →</RouterLink>
        </div>
    </BaseSection>
</template>