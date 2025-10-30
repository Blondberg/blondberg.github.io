<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const hovered = ref(null)
const scrolled = ref(false);

const menuItems = [
    { name: "Home", to: "/" },
    { name: "Projects", to: "/" },
    { name: "About", to: "/" },
]

// Change this value to your desired scroll threshold
const SCROLL_THRESHOLD = 200;
function onScroll() {
    scrolled.value = window.scrollY > SCROLL_THRESHOLD;
}

onMounted(() => {
    window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});

</script>

<template>
    <div class="flex flex-row justify-center items-center p-3 fixed top-0 transition-all duration-100 ease-in left-1/2 -translate-x-1/2"
        :class="{
            'w-2xl rounded-full top-4 p-1 bg-primary/50 backdrop-blur-xs border border-satwhite/15': scrolled,
            'w-full p-3 border-satwhite/0 ': !scrolled
        }">

        <RouterLink to="/" class="text-2xl font-pacifico absolute left-8">
            B
        </RouterLink>
        <nav class="flex flex-row gap-10 text-lg font-light uppercase transition-all duration-100 ease-in" :class="{
            'p-0': scrolled,
            'p-3': !scrolled
        }">
            <RouterLink v-for="item in menuItems" :key="item.name" :to="item.to" class="transition-opacity duration-200"
                :class="{
                    'opacity-50': hovered && hovered !== item.name,
                    'opacity-100': !hovered && hovered === item.name
                }" @mouseenter="hovered = item.name" @mouseleave="hovered = null">
                {{ item.name }}
            </RouterLink>
        </nav>
    </div>
</template>