<script setup>
import GitHubIcon from '../assets/GitHubIcon.vue'

const { title, subtitle, description, tags, ltr, imagePath, svg, git } = defineProps({
    title: String,
    subtitle: String,
    description: String,
    tags: Array,
    ltr: Boolean,
    imagePath: String,
    color: String,
    git: String,
    svg: String,
})
</script>

<template>
    <RouterLink
        :to="{
            name: 'project',
            params: { title: title.replace(/\s/g, '').toLowerCase() },
        }"
    >
        <div
            class="group h-[300px] w-full flex flex-col p-8 gap-6 rounded-4xl bg-primary text-white border-2 hover:-translate-y-1 transition-all duration-100 ease-in hover:text-primary"
            :class="[color]"
        >
            <!-- Top row -->
            <div class="flex flex-row gap-6 items-center">
                <!-- Image -->
                <div class="px-3 rounded-2xl">
                    <div
                        class="w-14 h-14 object-fill flex flex-col justify-center items-center"
                        v-html="svg"
                    ></div>
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
                    <GitHubIcon class="w-5 h-5 fill-white group-hover:fill-primary" /><a
                        class="hover:not-only:underline"
                        target="_blank"
                        :href="git"
                        @click.stop
                        >GitHub</a
                    >
                </div>

                <RouterLink
                    class="text-sm ml-auto hover:underline underline-offset-2"
                    :to="{
                        name: 'project',
                        params: { title: title.replace(/\s/g, '').toLowerCase() },
                    }"
                    >More info →</RouterLink
                >
            </div>
        </div>
    </RouterLink>
</template>
