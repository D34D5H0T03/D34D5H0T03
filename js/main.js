/**
 * ═════════════════════════════════════════════════════════════
 * D34D5H0T03 Portfolio — Core Interactive JavaScript
 * Lightweight, zero dependencies, vanilla JavaScript
 * ═════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. Terminal Typing Effect ───────────────────────────── */
    const typedTextEl = document.getElementById('typedText');
    const commands = [
        'whoami',
        'cat interests.txt',
        'nmap -sS -p 80,443 target',
        './tourneyd --bind 0.0.0.0 --port 1337',
        'afl-fuzz -i in -o out ./target_parser',
        'gdb -q ./custom_shell'
    ];

    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 110;

    function typeLoop() {
        if (!typedTextEl) return;

        const currentCommand = commands[commandIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typedTextEl.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 110;
        }

        if (!isDeleting && charIndex === currentCommand.length) {
            // Pause at end of command
            typingDelay = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            typingDelay = 500;
        }

        setTimeout(typeLoop, typingDelay);
    }

    typeLoop();


    /* ── 2. Sticky Navbar & Active Section Tracking ──────────── */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar blur and border
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section indicator
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check


    /* ── 3. Mobile Navigation Menu ───────────────────────────── */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navLinks');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }


    /* ── 4. Scroll Reveal Animations ─────────────────────────── */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('visible'));
    }


    /* ── 5. Subtle 3D Card Spotlight / Tilt (Desktop) ────────── */
    const projectCards = document.querySelectorAll('.project-card');

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Subtle spotlight gradient on hover
                card.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(220, 38, 38, 0.12), var(--bg-card-hover) 70%)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.background = '';
            });
        });
    }


    /* ── 6. Console Easter Egg ───────────────────────────────── */
    const consoleBanner = `
%c ██████╗  ██████╗  ██╗  ██╗ ██████╗  ███████╗ ██╗  ██╗  ██████╗  ████████╗
 ██╔══██╗ ╚════██╗ ██║  ██║ ██╔══██╗ ██╔════╝ ██║  ██║ ██╔═══██╗ ╚══██╔══╝
 ██║  ██║  █████╔╝ ███████║ ██║  ██║ ███████╗ ███████║ ██║   ██║    ██║   
 ██║  ██║  ╚═══██╗ ╚════██║ ██║  ██║ ╚════██║ ██╔══██║ ██║   ██║    ██║   
 ██████╔╝ ██████╔╝      ██║ ██████╔╝ ███████║ ██║  ██║ ╚██████╔╝    ██║   
 ╚═════╝  ╚═════╝       ╚═╝ ╚═════╝  ╚══════╝ ╚═╝  ╚═╝  ╚═════╝     ╚═╝   

  [+] Operator : Abdul Basit (D34D5H0T03)
  [+] Focus    : Systems Programming & Vulnerability Research
  [+] GitHub   : https://github.com/D34D5H0T03
  [+] Contact  : abdulbasitraj03@gmail.com
    `;
    console.log(consoleBanner, 'color: #ef4444; font-family: monospace; font-size: 11px; font-weight: bold; line-height: 1.2;');
    console.log('%c[!] SYSTEM: D34D5H0T Security Terminal Initialized.', 'color: #dc2626; font-family: monospace; font-size: 12px; font-weight: bold;');
    console.log('%c[*] Looking for vulnerabilities? Feel free to reach out!', 'color: #a1a1aa; font-family: monospace; font-size: 11px;');

});
