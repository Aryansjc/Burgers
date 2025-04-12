document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const burgerContainer = document.querySelector('.burger-model-container');
    
    const createSpotlight = () => {
        const spotlight = document.createElement('div');
        spotlight.classList.add('burger-spotlight');
        spotlight.style.position = 'absolute';
        spotlight.style.width = '300px';
        spotlight.style.height = '300px';
        spotlight.style.borderRadius = '50%';
        spotlight.style.background = 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)';
        spotlight.style.pointerEvents = 'none';
        spotlight.style.transition = 'all 0.4s ease';
        spotlight.style.zIndex = '2';
        spotlight.style.opacity = '0';
        spotlight.style.transform = 'translate(-50%, -50%)';
        burgerContainer.appendChild(spotlight);
        return spotlight;
    };
    
    const spotlight = createSpotlight();
    
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 768) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const burgerRect = burgerContainer.getBoundingClientRect();
            const burgerCenterX = burgerRect.left + burgerRect.width / 2;
            const burgerCenterY = burgerRect.top + burgerRect.height / 2;
            const distanceX = mouseX - burgerCenterX;
            const distanceY = mouseY - burgerCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const rotateY = 20 * ((mouseX - windowWidth / 2) / (windowWidth / 2));
            const rotateX = -10 * ((mouseY - windowHeight / 2) / (windowHeight / 2));
            burger.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            const maxDistance = 300;
            if (distance < maxDistance) {
                const opacity = 1 - distance / maxDistance;
                spotlight.style.opacity = opacity.toString();
                spotlight.style.left = `${mouseX - burgerRect.left}px`;
                spotlight.style.top = `${mouseY - burgerRect.top}px`;
            } else {
                spotlight.style.opacity = '0';
            }
        }
    });
    
    document.addEventListener('mouseleave', function() {
        burger.style.transform = 'rotateY(0deg) rotateX(0deg)';
        spotlight.style.opacity = '0';
    });
    
    burger.addEventListener('click', function() {
        burger.classList.add('bounce');
        createBurstEffect();
        setTimeout(function() {
            burger.classList.remove('bounce');
        }, 800);
    });
    
    function createBurstEffect() {
        const burstContainer = document.createElement('div');
        burstContainer.style.position = 'absolute';
        burstContainer.style.top = '50%';
        burstContainer.style.left = '50%';
        burstContainer.style.transform = 'translate(-50%, -50%)';
        burstContainer.style.width = '100%';
        burstContainer.style.height = '100%';
        burstContainer.style.pointerEvents = 'none';
        burstContainer.style.zIndex = '60';
        const burstItems = ['🍔', '🧀', '🥬', '🍅', '🥪'];
        const numberOfParticles = 15;
        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement('div');
            const randomIcon = burstItems[Math.floor(Math.random() * burstItems.length)];
            particle.textContent = randomIcon;
            particle.style.position = 'absolute';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.fontSize = `${Math.random() * 10 + 15}px`;
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 100;
            const duration = 0.5 + Math.random() * 0.5;
            particle.style.animation = `burstParticle ${duration}s forwards cubic-bezier(0.12, 0.9, 0.5, 1.0)`;
            particle.style.transformOrigin = 'center';
            const style = document.createElement('style');
            style.textContent = `
                @keyframes burstParticle {
                    0% {
                        transform: translate(-50%, -50%) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(
                            calc(-50% + ${Math.cos(angle) * distance}px), 
                            calc(-50% + ${Math.sin(angle) * distance}px)
                        ) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            burstContainer.appendChild(particle);
        }
        burgerContainer.appendChild(burstContainer);
        setTimeout(() => {
            burgerContainer.removeChild(burstContainer);
        }, 1500);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% {
                transform: scale(1);
            }
            40% {
                transform: scale(0.9);
            }
            70% {
                transform: scale(1.1);
            }
        }
        
        .bounce {
            animation: bounce 0.8s ease;
        }
    `;
    document.head.appendChild(style);
    
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(e) {
            if (window.innerWidth <= 768) {
                const tiltLR = e.gamma;
                const tiltFB = e.beta;
                const rotateY = Math.min(15, Math.max(-15, tiltLR));
                const rotateX = Math.min(10, Math.max(-10, (tiltFB - 40) / -3));
                burger.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            }
        });
    }
});
