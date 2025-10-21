<script setup>
import ProjectCard from './ProjectCard.vue';

import { ref, onMounted } from 'vue';

const sectionRef = ref(null)

const projects = ref([])


defineExpose({
    sectionRef
})

onMounted(async () => {
    try {
        const res = await fetch("/projects.json")
        if (!res.ok) throw new Error("Failed to load projects")
        projects.value = await res.json()
    } catch (e) {
        console.error(e)
    }
})


</script>

<template>
    <section ref="sectionRef" class="flex flex-col gap-11 w-full py-24">
        <div class="text-5xl gap-3 flex-col flex">
            <p class="text-5xl font-roboto">Projects</p>
            <p class="text-base font-light">A highlight.</p>
        </div>
        <div v-for="(project, index) in projects" :key="index">
            <ProjectCard :description="project.description" :title="project.title" :subtitle="project.subtitle"
                :ltr="index % 2 == 0" :technologies="project.technologies" :imagePath="project.imagePath">
            </ProjectCard>
        </div>
    </section>
</template>