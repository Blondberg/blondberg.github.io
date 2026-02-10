
<script setup>
const props = defineProps(['header', 'subheader'])
</script>

<template>
    <section class="flex flex-col gap-11 container py-24 mx-auto px-6 md:px-0">
        <div class="text-5xl gap-3 flex-col flex">
            <p class="text-5xl font-pacifico">{{ header }}</p>
            <p class="text-lg font-light italic">{{ subheader }}</p>
        </div>
        <slot />
    </section>
</template>