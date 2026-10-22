(() => {
const art = document.querySelector('.poem-art');

    const stanzas = document.querySelectorAll('.stanza');
    const bg = document.getElementById('background-fx');
    const hint = document.getElementById('scroll-hint-vertical');

    // Transición de fondo (Baja a la oscuridad de las catacumbas)
    const bgColors = [
        '#000',     // Inicio
        '#120012',  // Fiuscha tenue
        '#090012',  // Morado tenue
        '#001200',  // Verde tenue
        '#120009',  // Rosa tenue
        '#001a1a'   // AQUA FINAL (Catacumba inundada)
    ];

    window.addEventListener('scroll', () => {
        hint.style.opacity = art.getBoundingClientRect().top < -40 ? '0' : '1';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Cambiar el color de fondo según la clase de la estrofa
                if (entry.target.classList.contains('s1')) bg.style.background = bgColors[1];
                if (entry.target.classList.contains('s2')) bg.style.background = bgColors[2];
                if (entry.target.classList.contains('s3')) bg.style.background = bgColors[3];
                if (entry.target.classList.contains('s4')) bg.style.background = bgColors[4];
                if (entry.target.classList.contains('odio')) bg.style.background = bgColors[5];
            }
        });
    }, { threshold: 0.15 });

    stanzas.forEach(s => observer.observe(s));

})();