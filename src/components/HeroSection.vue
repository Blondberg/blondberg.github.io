<script setup>
import DownArrowIcon from '../assets/DownArrowIcon.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import StarBackground from './StarBackground.vue'

const emit = defineEmits(['scrollToProjects'])

function handleClick() {
    emit('scrollToProjects') // send event to parent
}

const quotes = ref([])
const randomQuote = ref()

onMounted(async () => {
    try {
        const res = await fetch('/quotes.json')
        if (!res.ok) throw new Error('Failed to load quotes')
        quotes.value = await res.json()

        // Pick a random quote after loading
        if (quotes.value.length > 0) {
            const i = Math.floor(Math.random() * quotes.value.length)
            randomQuote.value = quotes.value[i]
        }
    } catch (e) {
        console.error(e)
    }
})
</script>

<template>
    <div class="flex items-center justify-between flex-col pb-24 w-full h-screen">
        <StarBackground />
        <div class=""></div>

        <div class="flex-col flex items-center relative mb-44">
            <!-- Hero header -->
            <div class="text-4xl md:text-8xl">
                <span class="font-extralight font-inter">I am&nbsp;</span
                ><span class="font-pacifico">Blondberg</span>
            </div>
            <!-- Hero quote -->
            <div
                v-if="randomQuote"
                class="absolute top-full mt-10 right-4 text-md md:text-lg font-inter text-right ml-auto max-w-[30ch] animate-float"
            >
                <span class="font-extralight">&ldquo;{{ randomQuote.text }}&rdquo;</span><br /><span
                    v-if="randomQuote.credit"
                    >&nbsp;&mdash; {{ randomQuote.credit }}</span
                >
            </div>
        </div>
        <!-- Hero scroll button -->
        <div class="relative flex items-center justify-center group">
            <div
                ref="sun"
                class="border-white cursor-pointer border-2 w-10 h-10 rounded-full bottom-0 z-[9998] flex items-center justify-center animate-[spin_6s_linear_infinite]"
                @click="handleClick"
            >
                <!-- Moon -->
                <div
                    ref="moon"
                    class="absolute w-3 h-3 rounded-full bg-neutral-200 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 group-hover:left-1/2 group-hover:w-0 group-hover:h-0 delay-150 group-hover:delay-0 group-hover:-translate-x-1/2 transition-all duration-100 linear"
                ></div>
            </div>
            <DownArrowIcon
                class="absolute w-0 h-0 mt-1 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 stroke-white stroke-3 group-hover:w-6 group-hover:h-6 transition-all duration-75 group-hover:delay-150 animate-[bounce_2s_linear_infinite]"
            />
        </div>
    </div>
</template>