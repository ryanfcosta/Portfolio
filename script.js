/* ===== INICIALIZAÇÃO ===== */
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initSmoothScrolling();
    initTypingEffect();
    initSkillBars();
    initActiveNavigation();
    initScrollAnimations();
    addDynamicStyles();
});

/* ===== NAVBAR MOBILE ===== */
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

/* ===== SCROLL SMOOTH ===== */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===== EFEITO DE DIGITAÇÃO ===== */
function initTypingEffect() {
    const heroText = document.querySelector('.character-name h1');
    if (!heroText) return;
    
    const text = heroText.textContent;
    const speed = 80;
    heroText.textContent = '';
    heroText.style.borderRight = '2px solid var(--secondary-color)';
    let charIndex = 0;
    
    function typeChar() {
        if (charIndex < text.length) {
            heroText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, speed);
        } else {
            setTimeout(() => {
                heroText.style.borderRight = 'none';
            }, 1000);
        }
    }
    setTimeout(typeChar, 800);
}

/* ===== ANIMAÇÃO DAS SKILL CARDS ===== */
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card'); 
    skillCards.forEach(card => {
        const skillInfo = card.querySelector('.skill-info');
        if (!skillInfo) return;
        
        card.addEventListener('mouseenter', () => {
            skillInfo.style.opacity = '1';
            skillInfo.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', () => {
            skillInfo.style.opacity = '0';
            skillInfo.style.transform = 'translateY(-5px)';
        });
    });
}

/* ===== NAVEGAÇÃO ATIVA ===== */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', throttle(() => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}

/* ===== ANIMAÇÕES DE SCROLL ===== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .skill-card, .contact-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* ===== ESTILOS DINÂMICOS ===== */
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--dark-bg);
            border-top: 1px solid #34495e;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 999;
        }
        .nav-menu.active .nav-link {
            padding: 1rem 2rem;
            border-bottom: 1px solid #34495e;
        }
        .nav-link.active {
            color: var(--secondary-color);
            background: rgba(52, 152, 219, 0.15);
        }
        .hamburger .bar {
            transition: all 0.3s ease;
        }
        .nav-menu {
            transition: all 0.3s ease;
        }
        .skill-info {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

/* ===== UTILITÁRIOS ===== */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}