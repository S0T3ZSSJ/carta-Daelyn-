const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

envelope.addEventListener('click', () => {
    envelope.classList.add('open');

    setTimeout(() => {
        envelope.classList.add('fall');
        letter.classList.add('show');
        launchBatFirework();
    }, 700);
});

function launchBatFirework() {
    const particles = [];
    const colors = ["#8a2be2", "#4b0082", "#000000", "#ff00ff"]; // Morados oscuros y negros para el estilo gótico

    const batPoints = [
        {x: 0, y: -10}, {x: -15, y: -30}, {x: 15, y: -30},
        {x: -40, y: -10}, {x: 40, y: -10},
        {x: -90, y: -15}, {x: 90, y: -15},
        {x: -60, y: 20}, {x: 60, y: 20},
        {x: 0, y: 35}
    ];

    batPoints.forEach(p => {
        for(let i=0; i<12; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (p.x + (Math.random() - 0.5) * 25) * 0.15,
                vy: (p.y + (Math.random() - 0.5) * 25) * 0.15,
                alpha: 1,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.008;
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
            if(p.alpha <= 0) particles.splice(i, 1);
        });
        if(particles.length > 0) requestAnimationFrame(animate);
    }
    animate();
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});