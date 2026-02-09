<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const project = ref();

onMounted(async () => {
  try {
    const res = await fetch(
      import.meta.env.BASE_URL + `projects/${route.params.title}.html`
    );
    if (!res.ok) throw new Error("Failed to load project md");
    project.value = await res.text();
  } catch (e) {
    console.error("Failed to load projects:", e);
  }
});
</script>

<template>
  <div class="container max-w-[1200px] mx-auto text-white mt-20">
    <RouterLink to="/projects" class="">← Back to projects </RouterLink>
    <div class="markdown" v-if="project" v-html="project"></div>
    <div v-else class="animate-pulse opacity-70">Loading project…</div>
  </div>
</template>
