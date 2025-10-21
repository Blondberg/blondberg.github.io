<script setup>
const { title, subtitle, description, technologies, ltr, imagePath } = defineProps({
    title: String,
    subtitle: String,
    description: String,
    technologies: Array,
    ltr: Boolean,
    imagePath: String,
    color: String
});
</script>

<template>

    <div class="group h-[300px] w-full flex flex-col p-8 gap-6 rounded-4xl text-white border hover:-translate-y-1 transition-all duration-300 ease-out"
        :class="[color]">
        <!-- Top row -->
        <div class="flex flex-row gap-6 items-center">
            <!-- Image -->
            <div class="bg-primary p-3 rounded-2xl stroke-white text-white fill-white">
                <img v-if="imagePath" :src="imagePath" alt=""
                    class="h-14 w-14 object-fill stroke-white text-white fill-white " />
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
        <!-- Bottom row -->
        <div>
            <!-- Description -->
            <div>
                <p class="text-sm font-pontano" v-html="description"></p>

            </div>
            <!-- CTA -->
            <div>

            </div>
        </div>
    </div>


    <div class="group w-full min-h-[312px] flex items-center justify-between gap-8 transition-all duration-500 hidden"
        :class="[ltr ? 'flex-row' : 'flex-row-reverse']">
        <!-- Image -->
        <div class="flex-1 relative rounded-3xl overflow-hidden backdrop-blur-sm border ">
            <img v-if="imagePath" :src="imagePath" alt=""
                class="max-h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />

            <!-- Title / subtitle -->
            <div class="absolute bottom-4 left-6 text-white">
                <p class="text-lg font-semibold uppercase tracking-wider">
                    {{ title }}
                </p>
                <p class="text-sm font-light">
                    {{ subtitle }}
                </p>
            </div>
        </div>

        <!-- Description  -->
        <div class="flex-2 text-left px-8 sm:px-12 py-6 transition-all duration-500 group-hover:translate-y-[-3px]"
            :class="ltr ? 'text-left' : 'text-right'">
            <p class="text-neutral-300 text-base font-pontano leading-relaxed" v-html="description"></p>

            <div class="mt-6 flex flex-wrap gap-2" :class="ltr ? 'justify-start' : 'justify-end'">
                <span v-for="(tech, i) in technologies" :key="i"
                    class="px-3 py-1 text-xs uppercase rounded-full bg-white/10 border border-white/20 text-neutral-200 tracking-wide hover:bg-white/20 transition-all duration-300">
                    {{ tech }}
                </span>
            </div>
        </div>
    </div>
</template>
