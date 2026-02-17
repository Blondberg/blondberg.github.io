
<script setup>
const props = defineProps(['header', 'subheader'])
</script>

<template>
    <section class="flex flex-col max-w-[1200px] px-8 mx-auto lg:py-24 py-10">
        <div v-if="header || subheader" class="flex flex-col gap-3 text-5xl mb-11">
            <p class="text-3xl md:text-5xl font-inter font-extralight">{{ header }}</p>
            <p class="text-base font-light">{{ subheader }}</p>
        </div>
        <slot />
    </section>
</template>