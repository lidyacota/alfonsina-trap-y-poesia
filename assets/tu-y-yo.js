(() => {
const art = document.querySelector('.poem-art');

const canvas = document.getElementById("heart-canvas");
const ctx = canvas.getContext("2d");
let w, h;

const motelColors = [
    { r: 255, g: 0, b: 128, hex: "#ff0080" }, 
    { r: 0, g: 255, b: 255, hex: "#00ffff" }, 
    { r: 255, g: 0, b: 0, hex: "#ff0000" },   
    { r: 128, g: 0, b: 255, hex: "#8000ff" }, 
    { r: 255, g: 255, b: 0, hex: "#ffff00" }
];

function resize() {
    w = canvas.width = art.clientWidth;
    h = canvas.height = art.clientHeight;
}
new ResizeObserver(resize).observe(art);
resize();

class Heart {
    constructor() {
        this.init();
    }
    init() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = 0;
        this.maxSize = Math.random() * 80 + 50;
        // VELOCIDAD EXTREMA: Más rápido es menos carga de procesamiento por segundo
        this.speed = Math.random() * 8 + 6; 
        this.opacity = 1;
        this.growing = true;
        this.colorData = motelColors[Math.floor(Math.random() * motelColors.length)];
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Optimización: Menos iteraciones en el loop (0.2 en vez de 0.1)
        const traceHeart = (s) => {
            ctx.beginPath();
            for (let t = 0; t <= Math.PI * 2; t += 0.2) {
                let x = 16 * Math.pow(Math.sin(t), 3);
                let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                ctx.lineTo(x * (s/12), y * (s/12));
            }
            ctx.closePath();
        };

        // 1. Brillo Exterior
        ctx.shadowBlur = 30; 
        ctx.shadowColor = this.colorData.hex;
        ctx.strokeStyle = `rgba(${this.colorData.r}, ${this.colorData.g}, ${this.colorData.b}, ${this.opacity})`;
        ctx.lineWidth = 12; 
        traceHeart(this.size);
        ctx.stroke();

        // 2. Núcleo de gas blanco (El truco del Motel)
        ctx.shadowBlur = 5;
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 3; 
        ctx.stroke();

        ctx.restore();
    }
    update() {
        if (this.growing) {
            this.size += this.speed;
            if (this.size >= this.maxSize) this.growing = false;
        } else {
            // EXPLOSIÓN RÁPIDA: Desaparece en pocos frames
            this.opacity -= 0.08; 
            if (this.opacity <= 0) this.init();
        }
    }
}

// 5 Corazones: Equilibrio perfecto entre "caos" y fluidez
const hearts = Array.from({ length: 5 }, () => new Heart());

function animate() {
    ctx.clearRect(0, 0, w, h); // ClearRect es más rápido que FillRect para el procesador
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    
    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animate);
}
animate();

})();