document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('leaves-container');
    const bgLayer1 = document.getElementById('bg-layer-1');
    const bgLayer2 = document.getElementById('bg-layer-2');


    // Season Configurations
    const seasons = [
        {
            name: 'spring',
            className: 'season-spring',
            background: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
            colors: ['#ffb7b2', '#ff9aa2', '#ffdac1', '#fff0f5'],
            shape: 'petal',
            count: 30
        },
        {
            name: 'summer',
            className: 'season-summer',
            background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
            colors: ['#a8e6cf', '#dcedc1', '#88d8b0', '#98ddca'],
            shape: 'leaf',
            count: 30
        },
        {
            name: 'autumn',
            className: 'season-autumn',
            background: 'linear-gradient(135deg, #fceabb 0%, #f8b500 50%, #f29f05 100%)',
            colors: ['#d94844', '#f29f05', '#f2cb05', '#8c4e03'],
            shape: 'leaf',
            count: 30
        },
        {
            name: 'winter',
            className: 'season-winter',
            background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
            colors: ['#ffffff', '#f0f8ff', '#e6e6fa'],
            shape: 'snow',
            count: 50
        }
    ];

    let currentSeasonIndex = 0;
    let currentSeasonConfig = seasons[0];
    let activeLayer = 1; // 1 or 2

    function setSeason(index) {
        const season = seasons[index];
        currentSeasonConfig = season;

        // Handle Background Cross-fade
        const nextLayer = activeLayer === 1 ? bgLayer2 : bgLayer1;
        const currentLayer = activeLayer === 1 ? bgLayer1 : bgLayer2;

        // Set background on the hidden layer
        nextLayer.style.background = season.background;
        nextLayer.style.backgroundSize = 'cover';
        nextLayer.style.backgroundPosition = 'center';

        // Fade in next layer, fade out current
        nextLayer.classList.add('active');
        currentLayer.classList.remove('active');

        // Swap active layer tracker
        activeLayer = activeLayer === 1 ? 2 : 1;
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const config = currentSeasonConfig;

        // Random properties
        const size = config.shape === 'snow' ? Math.random() * 5 + 5 : Math.random() * 20 + 10;
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        const startLeft = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;

        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.position = 'absolute';
        particle.style.top = '-50px';
        particle.style.left = `${startLeft}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.5;

        // Shape specific styles
        if (config.shape === 'leaf') {
            particle.style.borderRadius = '50% 0 50% 0';
        } else if (config.shape === 'petal') {
            particle.style.borderRadius = '50% 0 50% 50%';
        } else if (config.shape === 'snow') {
            particle.style.borderRadius = '50%';
        }

        // Animation
        const rotateStart = Math.random() * 360;
        const rotateEnd = rotateStart + 360;
        const sway = Math.random() * 100 - 50;

        particle.animate([
            { transform: `translate(0, 0) rotate(${rotateStart}deg)`, opacity: 1 },
            { transform: `translate(${sway}px, 100vh) rotate(${rotateEnd}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            iterations: 1,
            easing: 'linear'
        });

        // Remove after animation
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (duration + delay) * 1000);

        container.appendChild(particle);
    }

    // Initialize
    // Set initial background on layer 1 without transition for immediate load
    bgLayer1.style.background = seasons[0].background;
    bgLayer1.style.backgroundSize = 'cover';

    // Start particle system
    for (let i = 0; i < 30; i++) {
        createParticle();
    }

    // Season Cycle Timer
    setInterval(() => {
        currentSeasonIndex = (currentSeasonIndex + 1) % seasons.length;
        setSeason(currentSeasonIndex);
    }, 10000); // 10 seconds
});
