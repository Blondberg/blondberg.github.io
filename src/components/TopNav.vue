<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import GitHubIcon from "../assets/GitHubIcon.vue";
import HamburgerIcon from "../assets/HamburgerIcon.vue";

const hovered = ref(null);
const scrolled = ref(false);
const open = ref(false);

const menuItems = [
  { name: "Home", to: "/" },
  { name: "Projects", to: "/projects" },
  { name: "About", to: "/" },
];

// Change this value to your desired scroll threshold
const SCROLL_THRESHOLD = 200;
function onScroll() {
  scrolled.value = window.scrollY > SCROLL_THRESHOLD;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <div
    class="flex flex-row justify-between items-center px-8 py-3 fixed top-0 transition-all duration-100 ease-in left-1/2 -translate-x-1/2"
    :class="{
      'w-full md:w-2xl md:rounded-full md:top-4 p-1 bg-primary/50 backdrop-blur-xs border border-purple/15':
        scrolled,
      'w-full p-3 border-satwhite/0 ': !scrolled,
    }"
  >
    <RouterLink to="/" class="text-2xl font-pacifico"> B </RouterLink>
    <nav
      class="absolute top-full text-right right-0 pr-8 md:pr-0 md:text-center md:top-0 md:static flex flex-col md:flex-row gap-10 text-md font-light uppercase transition-all duration-100 ease-in"
      :class="{
        'p-0': scrolled,
        'p-3': !scrolled,
        'hidden md:flex': !open,
        'bg-primary/50 w-full h-fit backdrop-blur-xs border-b border-purple/15':
          open,
      }"
      @click="open = false"
    >
      <RouterLink
        v-for="item in menuItems"
        :key="item.name"
        :to="item.to"
        class="transition-opacity duration-200"
        :class="{
          'opacity-50': hovered && hovered !== item.name,
          'opacity-100': !hovered && hovered === item.name,
        }"
        @click="open = false"
        @mouseenter="hovered = item.name"
        @mouseleave="hovered = null"
      >
        {{ item.name }}
      </RouterLink>
    </nav>
    <a
      class="hover:not-only:underline hidden md:block"
      target="_blank"
      href="https://github.com/Blondberg/"
    >
      <GitHubIcon class="w-6 h-6 fill-white group-hover:fill-primary"
    /></a>
    <!-- Mobile menu opener  -->
    <div class="md:hidden block cursor-pointer" @click="open = !open">
      <HamburgerIcon />
    </div>
  </div>
</template>