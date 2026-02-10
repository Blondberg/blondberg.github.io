<script setup>
import { ref, onMounted } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import BaseSection from '../components/BaseSection.vue'
import StarBackground from '../components/StarBackground.vue'

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
    <BaseSection ref="sectionRef" header="Projects">
        <StarBackground />
        <div class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
            <ProjectCard
                v-for="(project, index) in projects"
                :key="index"
                :description="project.description"
                :title="project.title"
                :subtitle="project.subtitle"
                :ltr="index % 2 == 0"
                :technologies="project.technologies"
                :imagePath="project.imagePath"
                :color="projectColors[index % 4]"
                :git="project.git"
                :svg="project.svg"
            >
            </ProjectCard>
        </div>
    </BaseSection>
</template>