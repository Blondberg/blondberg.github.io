<script setup>
import TopNav from './components/TopNav.vue'
</script>

<template>
    <div id="app">
        <TopNav class="z-[9999]" />
        <RouterView />
    </div>
</template>