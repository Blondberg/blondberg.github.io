<script setup>
import BaseSection from './BaseSection.vue'

import { ref, onMounted } from 'vue'

const sectionRef = ref(null)

defineExpose({
    sectionRef,
})
</script>

<template>
    <BaseSection id="about" ref="sectionRef" header="About" subheader="Me."> </BaseSection>
</template>