<script setup>
import AboutSection from '../components/AboutSection.vue'
import HeroSection from '../components/HeroSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import { ref, onMounted } from 'vue'

const projectsSection = ref(null) // reference to the DOM element

function scrollToProjects() {
    projectsSection.value.$el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
    <div class="container max-w-[1200px] mx-auto">
        <HeroSection @scrollToProjects="scrollToProjects" />
        <ProjectsSection ref="projectsSection" />
        <AboutSection />
    </div>
</template>
