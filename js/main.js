document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .scale-in, .fade-right, .fade-left, .fade-in');
    animatedElements.forEach(el => observer.observe(el));

    // Countdown Timer logic for Next Match
    // Set next match date to 7 days from now for demo purposes
    const nextMatchDate = new Date();
    nextMatchDate.setDate(nextMatchDate.getDate() + 7);
    nextMatchDate.setHours(16, 0, 0, 0);

    // Update match date text dynamically
    const matchDateEl = document.getElementById('match-date');
    if(matchDateEl) {
        const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        matchDateEl.innerText = `${daysOfWeek[nextMatchDate.getDay()]}, ${nextMatchDate.getDate()} ${months[nextMatchDate.getMonth()]} • 16:00`;
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = nextMatchDate.getTime() - now;

        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "A partida já começou!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Parallax effect on Hero Image
    const heroBg = document.querySelector('.hero-bg img');
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        if (heroBg && scrollValue < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollValue * 0.3}px) scale(1.05)`;
        }
    });

    // 3D Card effect on Membership Card based on mouse move
    const card = document.querySelector('.member-card');
    const container = document.querySelector('.membership-cards');
    
    if (container && card) {
        container.addEventListener('mousemove', (e) => {
            // Only apply on desktop
            if (window.innerWidth > 992) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -15;
                const rotateY = ((x - centerX) / centerX) * 15;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        container.addEventListener('mouseleave', () => {
            if (window.innerWidth > 992) {
                card.style.transform = `perspective(1000px) rotateX(5deg) rotateY(-15deg)`;
            }
        });
    }
});
