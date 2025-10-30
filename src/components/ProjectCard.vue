<script setup>
import GitHubIcon from "../assets/GitHubIcon.vue";

const { title, subtitle, description, technologies, ltr, imagePath, svg, git } = defineProps({
    title: String,
    subtitle: String,
    description: String,
    technologies: Array,
    ltr: Boolean,
    imagePath: String,
    color: String,
    git: String,
    svg: String
});
</script>

<template>

    <div class="group h-[300px] w-full flex flex-col p-8 gap-6 rounded-4xl bg-primary text-white border-2 hover:-translate-y-1 hover:text-primary transition-all duration-300 ease-out"
        :class="[color]">
        <!-- Top row -->
        <div class="flex flex-row gap-6 items-center">
            <!-- Image -->
            <div class="px-3 rounded-2xl">
                <!-- <img v-if="imagePath" :src="imagePath" alt="" class="h-14 w-14 object-fill" /> -->
                <div class="w-14 h-14 object-fill flex flex-col justify-center items-center" v-html="svg"></div>
            </div>
            <!-- Title/subtitle -->
            <div>
                <p class="text-lg font-semibold uppercase">
                    {{ title }}
                </p>
                <p class="text-sm font-light">
                    {{ subtitle }}
                </p>
            </div>
        </div>
        <!-- Description -->
        <div>
            <p class="text-sm font-pontano" v-html="description"></p>

        </div>
        <!-- CTA -->
        <div class="flex justify-self-end mt-auto">
            <div class="flex gap-2 text-sm justify-center" v-if="git">
                <GitHubIcon class="w-5 h-5 fill-white group-hover:fill-primary" /><a class="hover:not-only:underline"
                    target="_blank" :href="git">GitHub</a>
            </div>

            <RouterLink class="text-sm ml-auto" to="/">More info →</RouterLink>
        </div>
    </div>
</template>
