<script setup>
import { ref } from 'vue';

const hovered = ref(null)

const menuItems = [
    { name: "Home", to: "/" },
    { name: "Projects", to: "/" },
    { name: "About", to: "/" },
]


</script>

<template>
    <div class="flex flex-row justify-center w-full items-center p-3 fixed top-0 backdrop-blur-xs">
        <RouterLink to="/" class="text-2xl font-pacifico absolute left-8">
            B
        </RouterLink>
        <nav class="flex flex-row gap-10 p-3 text-lg font-light uppercase">
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