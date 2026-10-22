(() => {
const art = document.querySelector('.poem-art');

    const canvas = document.getElementById('canvas-risas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    const colors = ['#00ffff', '#ff00ff', '#39ff14', '#9d00ff'];

    function initCanvas() {
        canvas.width = art.clientWidth;
        canvas.height = art.clientHeight;
    }

    class Smile {
        constructor() { this.reset(); }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 16 + 10;
            this.isFlash = Math.random() > 0.65; 
            const speedBase = this.isFlash ? (Math.random() * 35 + 25) : (Math.random() * 3 + 1);
            this.speedX = this.isFlash ? speedBase : (Math.random() - 0.5) * speedBase;
            this.speedY = (Math.random() - 0.5) * (this.isFlash ? 5 : speedBase);
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.angle = Math.random() * Math.PI * 2;
            this.shockTimer = 0;
        }

        update() {
            this.x += this.speedX; this.y += this.speedY;
            if (this.x < -150) this.x = canvas.width + 150;
            if (this.x > canvas.width + 150) this.x = -150;
            if (this.y < -150) this.y = canvas.height + 150;
            if (this.y > canvas.height + 150) this.y = -150;

            let dist = Math.sqrt((mouse.x - this.x)**2 + (mouse.y - this.y)**2);
            if(dist < 110) this.shockTimer = 20;

            if(this.shockTimer > 0) {
                this.x += (Math.random() - 0.5) * 65;
                this.y += (Math.random() - 0.5) * 65;
                this.shockTimer--;
            }
        }

        draw() {
            ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
            if (this.shockTimer > 0) {
                ctx.strokeStyle = "#fff"; ctx.shadowBlur = 55; ctx.lineWidth = 10; ctx.shadowColor = "#fff";
            } else {
                ctx.strokeStyle = this.color; ctx.shadowBlur = this.isFlash ? 35 : 15; ctx.lineWidth = this.isFlash ? 6 : 3; ctx.shadowColor = this.color;
            }
            ctx.beginPath(); ctx.arc(0, 0, this.size, 0.2 * Math.PI, 0.8 * Math.PI, false); ctx.stroke();
            ctx.fillStyle = this.shockTimer > 0 ? "#fff" : this.color;
            ctx.beginPath(); ctx.arc(-this.size/2, -this.size/2, 3, 0, Math.PI*2); ctx.arc(this.size/2, -this.size/2, 3, 0, Math.PI*2); ctx.fill();
            if(this.isFlash && this.shockTimer <= 0) {
                ctx.globalAlpha = 0.3; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-this.size, 0); ctx.lineTo(-this.size * 9, 0); ctx.stroke();
            }
            ctx.restore();
        }
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 11000) + 18;
        for(let i = 0; i < count; i++) particles.push(new Smile());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }

    const handleInput = (e) => {
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        const rect = art.getBoundingClientRect(); mouse.x = clientX - rect.left; mouse.y = clientY - rect.top;
    };

    new ResizeObserver(() => { initCanvas(); createParticles(); }).observe(art);
    window.addEventListener('mousemove', handleInput);
    window.addEventListener('touchstart', handleInput);
    window.addEventListener('touchmove', handleInput);

    initCanvas(); createParticles(); animate();

})();