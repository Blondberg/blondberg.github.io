<script setup>
import { onMounted, computed } from 'vue';

const { title, subtitle, description, technologies, ltr } = defineProps({
    title: String,
    subtitle: String,
    description: String,
    technologies: Array,
    ltr: Boolean,
    imagePath: String
})

</script>

<template>
    <div class="w-full min-h-[200px] flex relative items-center justify-center"
        :class="[ltr ? 'flex-row' : 'flex-row-reverse']">
        <!-- min-h-[312px]-->
        <!-- Meta section -->
        <div class="relative flex-1 flex flex-col p-">
            <!-- Image container -->
            <!-- <div class="flex-shrink-0 flex justify-center items-start mb-4">
                <img :src="imagePath" alt="" class="max-h-[200px] w-auto object-contain" />
            </div> -->

            <!-- Title, subtitle, and technologies -->
            <div class="text-center w-full "> <!-- mt-auto -->
                <p class=" mb-2"><span class="font-semibold uppercase text-lg">{{ title }}</span><br /><span
                        class="font-light">{{ subtitle
                        }}</span>

                </p>
                <p class="text-sm uppercase text-orange"><span v-for="(technology, index) in technologies"
                        :key="index">{{
                            technology }}<span v-if="index < technologies.length - 1"> • </span></span></p>
            </div>
        </div>

        <!-- Description section -->
        <div class="text-center px-16 text-base tracking-wide font-pontano self-center h-full flex-2">
            <p v-html="description"></p>
        </div>

    </div>
</template>