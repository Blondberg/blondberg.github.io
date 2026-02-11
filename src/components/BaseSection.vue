
<script setup>
const props = defineProps(['header', 'subheader'])
</script>

<template>
    <section class="flex flex-col max-w-[1200px] px-8 mx-auto py-24">
        <div v-if="header || subheader" class="flex flex-col gap-3 text-5xl mb-11">
            <p class="text-3xl md:text-5xl font-pacifico">{{ header }}</p>
            <p class="text-base italic font-light">{{ subheader }}</p>
        </div>
        <slot />
    </section>
</template>