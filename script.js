const canvas = document.getElementById("cw");
const context = canvas.getContext("2d")
const cursor = {
    x: 10,
    y: 10
}


const particles = []
const cursorParticle = new Particle(2, 2, 2, 2)

setSize()
generateParticles(300)
anim()

addEventListener("mousemove", (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    requestAnimationFrame(anim)
})

addEventListener(
    "touchmove",
    (e) => {
        e.preventDefault();
        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
    },
    { passive: false },
);

addEventListener("resize", () => setSize());



function generateParticles(n) {
    for (let i = 0; i < n; i++) {
        particles.push(new Particle(2, 2, 2, 2))
    }
}

function Particle() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2
    this.speed = Math.random() * 1;
    this.angle = Math.random() * Math.PI * 2;
    this.xspeed = Math.cos(this.angle) * this.speed
    this.yspeed = Math.sin(this.angle) * this.speed
    this.illumination = 100


    this.move = () => {
        if (this.x > canvas.width || this.x < 0) {
            this.xspeed *= -1
        }
        if (this.y > canvas.height || this.y < 0) {
            this.yspeed *= -1
        }
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    this.draw = () => {
        context.beginPath()
        this.setIllumination()
        context.fillStyle = `rgb(255 255 255 / ${this.illumination}%)`
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Outer circle
        context.fill()
    }

    this.setIllumination = () => {
        const distance = Math.sqrt(Math.pow(cursor.x - this.x, 2) + Math.pow(cursor.y - this.y, 2));
        const maxDistance = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2;
        this.illumination = Math.max(0, 100 * (1 - distance / maxDistance));
    };

}

function setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
}

function anim() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.strokeStyle = "rgb(255 255 255)";
    context.lineWidth = 0.3

    particles.forEach(particle => {
        particle.move()
        particle.draw()
    });

    const maxCursorDistance = canvas.width / 4 // max distance from cursor for edges to be drawn
    const maxParticleDistance = 70 // max distance for it to draw edges between particles

    const connectedParticles = new Set()

    cursorParticle.x = cursor.x
    cursorParticle.y = cursor.y
    cursorParticle.draw()

    let edges = []

    // check which particles are initially connected to cursor
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // get distance to cursor
        const dxCursor = particle.x - cursor.x;
        const dyCursor = particle.y - cursor.y;
        const distanceToCursor = Math.sqrt(dxCursor * dxCursor + dyCursor * dyCursor);

        if (distanceToCursor < maxParticleDistance) {
            edges.push([cursorParticle, particle])
            connectedParticles.add(particle)
        }
    }

    // check for existing edges. Set particles as connected to cursor if indirectly connected.
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const particle1 = particles[i]
            const particle2 = particles[j]
            const dx = particle1.x - particle2.x;
            const dy = particle1.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const dxCursor = particle1.x - cursor.x;
            const dyCursor = particle1.y - cursor.y;
            const distanceToCursor = Math.sqrt(dxCursor * dxCursor + dyCursor * dyCursor);

            // // Skip particles beyond the maximum cursor distance
            if (distanceToCursor > maxCursorDistance) continue;

            if (distance <= maxParticleDistance) { // Adjust the threshold as needed
                edges.push([particle1, particle2])

                if (connectedParticles.has(particle1) || connectedParticles.has(particle2)) {
                    connectedParticles.add(particle1)
                    connectedParticles.add(particle2)
                }
                // context.beginPath();
                // context.strokeStyle = `rgb(255 255 255 / ${particles[i].illumination}%)`
                // context.moveTo(particles[i].x, particles[i].y);
                // context.lineTo(particles[j].x, particles[j].y);
                // context.stroke();
            }
        }
    }

    // draw the edges based on which nodes are (in)directly connected to the cursor
    edges.forEach(edge => {
        particle1 = edge[0]
        particle2 = edge[1]
        if (connectedParticles.has(particle1) || connectedParticles.has(particle2)) {
            context.beginPath();
            context.strokeStyle = `rgb(255 255 255 / ${particle1.illumination}%)`
            context.moveTo(particle1.x, particle1.y);
            context.lineTo(particle2.x, particle2.y);
            context.stroke();
        }
    });
}