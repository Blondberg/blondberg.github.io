<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import GitHubIcon from '../assets/GitHubIcon.vue'
import HamburgerIcon from '../assets/HamburgerIcon.vue'

const hovered = ref(null)
const scrolled = ref(false)
const open = ref(false)

const menuItems = [
    { name: 'Home', to: '/' },
    { name: 'Projects', to: '/projects' },
    { name: 'About', to: '/' },
]

// Change this value to your desired scroll threshold
const SCROLL_THRESHOLD = 200
function handleScroll() {
    scrolled.value = window.scrollY > SCROLL_THRESHOLD
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <div
        class="fixed top-0 flex flex-row items-center justify-between px-8 py-3 transition-all duration-100 ease-in -translate-x-1/2 bg-primary left-1/2"
        :class="{
            'w-full md:w-2xl md:rounded-full md:top-4 p-1 border-b md:border border-purple/15':
                scrolled,
            'w-full p-3 border-satwhite/0 ': !scrolled,
        }"
    >
        <RouterLink to="/" class="text-2xl font-pacifico"> B </RouterLink>
        <nav
            class="absolute right-0 flex flex-col gap-3 pr-8 font-light text-right uppercase md:gap-10 top-full text-md md:static md:top-0 md:flex-row md:pr-0 md:text-center"
            :class="[
                scrolled ? 'md:p-0 p-3' : 'p-3',
                open
                    ? 'w-full md:w-auto bg-primary md:border-none border-b border-purple/15'
                    : 'hidden md:flex',
            ]"
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
            <a
                class="self-end block md:hidden hover:not-only:underline"
                target="_blank"
                href="https://github.com/Blondberg/"
            >
                <GitHubIcon class="w-6 h-6 fill-white group-hover:fill-primary"
            /></a>
        </nav>
        <a
            class="hidden hover:not-only:underline md:block"
            target="_blank"
            href="https://github.com/Blondberg/"
        >
            <GitHubIcon class="w-6 h-6 fill-white group-hover:fill-primary"
        /></a>
        <!-- Mobile menu opener  -->
        <div class="block cursor-pointer md:hidden" @click="open = !open">
            <HamburgerIcon />
        </div>
    </div>
</template>