<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header
    class="font-normal text-black p-16 px-28 flex items-center place-content-between"
  >
    <div class="font-pacifico tracking-[0.04em] text-3xl">Blondberg</div>
    <nav
      class="font-pontanosans uppercase text-[15px] tracking-[0.065em] flex gap-20"
    >
      <RouterLink
        v-for="router in routers"
        :to="router.link"
        class="border-button relative p-3"
        ><span>{{ router.title }}</span></RouterLink
      >
    </nav>
  </header>

  <RouterView />
</template>

<style>
.border-button::before,
.border-button::after {
  position: absolute;
  content: "";
  height: 2px;
  width: 0;
  transition: 0.1s linear;
  transition-delay: 0.1s;
  background-color: black;
}

.border-button:hover::before,
.border-button:hover::after {
  width: 100%;
  transition-delay: 0s;
}

.border-button::before {
  top: 0;
  right: 0;
}

.border-button::after {
  left: 0;
  bottom: 0;
}

.border-button span::before,
.border-button span::after {
  position: absolute;
  content: "";
  height: 0;
  width: 2px;
  transition: all 0.1s linear;
  transition-delay: 0s;
  background-color: black;
}

.border-button:hover span::before,
.border-button:hover span::after {
  height: 100%;
  transition-delay: 0.1s;
}

.border-button span::before {
  left: 0;
  top: 0;
}

.border-button span::after {
  right: 0;
  bottom: 0;
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      routers: [
        {
          title: "Home",
          link: "/",
        },
        {
          title: "Projects",
          link: "/",
        },
        {
          title: "About",
          link: "/",
        },
      ],
    };
  },
};
</script>
