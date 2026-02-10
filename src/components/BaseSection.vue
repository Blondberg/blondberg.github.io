
<script setup>
const props = defineProps(['header', 'subheader'])
</script>

<template>
    <section class="flex flex-col max-w-[1200px] px-6 py-24 mx-auto gap-11">
        <div class="flex flex-col gap-3 text-5xl">
            <p class="text-3xl md:text-5xl font-pacifico">{{ header }}</p>
            <p class="text-base italic font-light">{{ subheader }}</p>
        </div>
        <slot />
    </section>
</template>