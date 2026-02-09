<script setup>
import { ref, onMounted } from "vue";
import ProjectCard from "../components/ProjectCard.vue";

const sectionRef = ref(null);

const projects = ref([]);

const projectColors = [
  "border-orange hover:bg-orange",
  "border-purple hover:bg-purple",
  "border-satwhite hover:bg-satwhite",
  "border-pink hover:bg-pink",
];

defineExpose({
  sectionRef,
});

onMounted(async () => {
  try {
    const res = await fetch("/projects.json");
    if (!res.ok) throw new Error("Failed to load projects");
    projects.value = await res.json();
  } catch (e) {
    console.error(e);
  }
});
</script>

<template>
  <div class="container max-w-[1200px] mx-auto text-white mt-40">
    <section ref="sectionRef" class="flex flex-col gap-11 w-full">
      <div class="text-5xl gap-3 flex-col flex">
        <p class="text-5xl font-pacifico">Projects.</p>
      </div>
      <div class="grid grid-cols-3 gap-8">
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
    </section>
  </div>
</template>