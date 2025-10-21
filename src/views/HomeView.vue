<script setup>
import HeroSection from '../components/HeroSection.vue';
import ProjectsSection from '../components/ProjectsSection.vue';
import { ref, onMounted } from 'vue';


const projectsSection = ref(null) // reference to the DOM element

function scrollToProjects() {
    if (projectsSection.value) {
        projectsSection.value?.sectionRef.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

onMounted(() => {
})
</script>

<template>
    <div class="container max-w-[1200px] mx-auto">
        <HeroSection @scrollToProjects="scrollToProjects" />
        <ProjectsSection ref="projectsSection" />
    </div>
</template>
