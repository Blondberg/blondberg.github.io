<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

//  Canvas setup
const canvasRef = ref(null)
let ctx
const cursor = { x: 0, y: 0 }
let particles = []
let cursorParticle

let handleMouseMove
let handleTouchMove
let handleResize

// Particle class
class Particle {
    constructor() {
        this.reset()
    }

    reset() {
        this.x = Math.random() * canvasRef.value.width
        this.y = Math.random() * canvasRef.value.height
        this.size = Math.random() * 2
        this.speed = Math.random()
        this.angle = Math.random() * Math.PI * 2
        this.xspeed = Math.cos(this.angle) * this.speed
        this.yspeed = Math.sin(this.angle) * this.speed
        this.illumination = 100
    }

    move() {
        if (this.x > canvasRef.value.width || this.x < 0) this.xspeed *= -1
        if (this.y > canvasRef.value.height || this.y < 0) this.yspeed *= -1
        this.x += this.xspeed
        this.y += this.yspeed
    }

    updateIllumination() {
        const dx = cursor.x - this.x
        const dy = cursor.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = Math.sqrt(canvasRef.value.width ** 2 + canvasRef.value.height ** 2) / 2
        this.illumination = Math.max(0, 100 * (1 - distance / maxDistance))
    }

    draw() {
        ctx.beginPath()
        this.updateIllumination()
        ctx.fillStyle = `rgb(255 255 255 / ${this.illumination}%)`
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

//  Utility functions
function setCanvasSize() {
    const canvas = canvasRef.value
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    cursor.x = Math.min(cursor.x, canvas.width)
    cursor.y = Math.min(cursor.y, canvas.height)
}

function generateParticles(count) {
    particles = Array.from({ length: count }, () => new Particle())
}

function drawConnections() {
    const maxCursorDist = canvasRef.value.width / 4
    const maxParticleDist = 70
    const connected = new Set()
    const edges = []

    cursorParticle.x = cursor.x
    cursorParticle.y = cursor.y
    // cursorParticle.size = 6;
    cursorParticle.draw()

    // Connect cursor to nearby particles
    for (const p of particles) {
        const dx = p.x - cursor.x
        const dy = p.y - cursor.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < maxParticleDist) {
            edges.push([cursorParticle, p])
            connected.add(p)
        }
    }

    // Connect particles to each other
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i]
            const p2 = particles[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const dxCursor = p1.x - cursor.x
            const dyCursor = p1.y - cursor.y
            const distToCursor = Math.sqrt(dxCursor * dxCursor + dyCursor * dyCursor)

            if (distToCursor > maxCursorDist) continue
            if (dist <= maxParticleDist) {
                edges.push([p1, p2])
                if (connected.has(p1) || connected.has(p2)) {
                    connected.add(p1)
                    connected.add(p2)
                }
            }
        }
    }

    // Draw edges
    for (const [p1, p2] of edges) {
        if (connected.has(p1) || connected.has(p2)) {
            ctx.beginPath()
            ctx.strokeStyle = `rgb(255 255 255 / ${p1.illumination}%)`
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
        }
    }
}
let animationId
function animate() {
    if (!canvasRef.value) return // component is gone
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
    ctx.strokeStyle = 'rgb(255 255 255)'
    ctx.lineWidth = 0.3

    particles.forEach((p) => {
        p.move()
        p.draw()
    })

    drawConnections()
    animationId = requestAnimationFrame(animate)
}

//  Lifecycle hooks
onMounted(async () => {
    const canvas = canvasRef.value
    ctx = canvas.getContext('2d')
    cursorParticle = new Particle()

    setCanvasSize()
    generateParticles(300)
    animate()

    // Mouse + touch movement
    handleMouseMove = (e) => {
        const rect = canvasRef.value.getBoundingClientRect()
        cursor.x = (e.clientX - rect.left) * (canvasRef.value.width / rect.width)
        cursor.y = (e.clientY - rect.top) * (canvasRef.value.height / rect.height)
    }

    handleTouchMove = (e) => {
        e.preventDefault()
        cursor.x = e.touches[0].clientX
        cursor.y = e.touches[0].clientY
    }

    handleResize = () => setCanvasSize()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('resize', handleResize)
})
// Clean up listeners when component unmounts
onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('resize', handleResize)
    cancelAnimationFrame(animationId)
})
</script>
<template>
    <canvas
        ref="canvasRef"
        class="absolute w-full top-0 left-0 h-full overflow-hidden z-[-10]"
    ></canvas>
</template>