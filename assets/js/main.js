document.addEventListener('DOMContentLoaded', () => {
lucide.createIcons();

    // GSAP Registration
    gsap.registerPlugin(ScrollTrigger);

    // ---- NAVBAR: Glass blur on scroll ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });

    // ---- MOBILE MENU TOGGLE ----
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // ---- HERO ENTRANCE: GSAP Stagger Timeline ----
    const heroTl = gsap.timeline({
      defaults: {
        ease: 'power4.out',
        duration: 1
      },
      delay: 0.3
    });

    heroTl
      .fromTo('#anim-kicker', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo('#anim-headline', 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }, 
        '-=0.5'
      )
      .fromTo('#anim-line', 
        { scaleX: 0, opacity: 0, transformOrigin: 'left center' }, 
        { scaleX: 1, opacity: 1, duration: 0.6 }, 
        '-=0.5'
      )
      .fromTo('#anim-sub', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.9 }, 
        '-=0.3'
      )
      .fromTo('#anim-cta', 
        { y: 25, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        '-=0.4'
      )
      .fromTo('#anim-micro', 
        { y: 15, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6 }, 
        '-=0.3'
      )
      .fromTo('#anim-image', 
        { x: 60, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 
        0.5  // starts at 0.5s absolute for a staggered feel
      );

    // ---- VANILLA TILT on Hero Image ----
    const tiltEl = document.getElementById('heroTilt');
    if (tiltEl && window.innerWidth >= 1024) {
      VanillaTilt.init(tiltEl, {
        max: 6,
        speed: 800,
        scale: 1.02,
        glare: true,
        'max-glare': 0.12,
        perspective: 1200,
        gyroscope: false
      });
    }

    // ---- PARTICLES CREATION ----
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 20 + 6;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.animationDelay = (Math.random() * 25) + 's';
      p.style.animationDuration = (Math.random() * 15 + 18) + 's';
      // Some particles use wine, some use orange for variety
      if (i % 4 === 0) {
        p.style.background = 'rgba(109, 22, 32, 0.08)';
      } else if (i % 3 === 0) {
        p.style.background = 'rgba(229, 133, 72, 0.1)';
      }
      particlesContainer.appendChild(p);
    }

    // ---- SCROLL INDICATOR: Fade out on scroll ----
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      window.addEventListener('scroll', () => {
        const opacity = Math.max(0, 1 - window.scrollY / 200);
        scrollIndicator.style.opacity = opacity;
      });
    }

    // ========================================
    // SECTION 2: PAIN / IDENTIFICATION — GSAP
    // ========================================

    // ---- 1. CASCADING PARAGRAPH REVEALS ----
    const paraReveals = document.querySelectorAll('.para-reveal');
    paraReveals.forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay: (i % 3) * 0.1 // Stagger feeling
      });
    });

    // ---- 2. PARALLAX on section background ----
    const s2Bg = document.getElementById('s2-bg-parallax');
    if (s2Bg) {
      gsap.to(s2Bg, {
        scrollTrigger: {
          trigger: '#problema',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: '20%',
        ease: 'none'
      });
    }

    // ---- 3. ELEGANT CARDS ENTRANCE & PARALLAX ----
    const cardsContainer = document.getElementById('cardsContainer');
    
    if (cardsContainer) {
      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsContainer,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // 3D Entrance
      cardsTl
        .fromTo('.anim-card-1', 
          { x: -100, opacity: 0, rotateY: 15 },
          { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out' }
        )
        .fromTo('.anim-card-2', 
          { x: 100, opacity: 0, rotateY: -15 },
          { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        )
        .fromTo('.anim-divider',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
          '-=0.5'
        )
        .fromTo('#cardGlowBg',
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 0.4, duration: 2, ease: 'power2.out' },
          '-=1'
        )
        .fromTo('.anim-item-1',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=1.2'
        )
        .fromTo('.anim-item-2',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=1'
        );

      // Continuous floating orb
      gsap.to('.anim-orb', {
        y: 20,
        x: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Scroll Parallax (cards float at different speeds)
      gsap.to('.anim-card-1', {
        scrollTrigger: {
          trigger: cardsContainer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -30,
        ease: 'none'
      });
      gsap.to('.anim-card-2', {
        scrollTrigger: {
          trigger: cardsContainer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        },
        y: -70,
        ease: 'none'
      });
    }

    // ---- 4. PROGRESSIVE TEXT HIGHLIGHTING ----
    ['impact1', 'impact2', 'impact3'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => el.classList.add('is-active'),
        onLeaveBack: () => el.classList.remove('is-active')
      });
    });

    // ---- 6. SCROLL PROGRESS INDICATOR ----
    const progressFill = document.getElementById('sectionProgressFill');
    const problemaSection = document.getElementById('problema');
    if (progressFill && problemaSection) {
      gsap.to(progressFill, {
        scrollTrigger: {
          trigger: problemaSection,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.3
        },
        scaleY: 1,
        ease: 'none'
      });
    }

    // ========================================
    // SECTION 3: AUTHORITY — GSAP
    // ========================================

    const autoridadeSection = document.getElementById('autoridade');
    if (autoridadeSection) {
      const s3Tl = gsap.timeline({
        scrollTrigger: {
          trigger: autoridadeSection,
          start: 'top 65%',
          toggleActions: 'play none none reverse'
        }
      });

      // 1. Photo Curtain Reveal
      s3Tl.to('.s3-image-mask', {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        ease: 'power3.inOut'
      }, 0);

      // 2. Credibility Boxes Fade In
      s3Tl.fromTo('.s3-cred-box',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
        0.6
      );

      // 3. Number Counter Animation
      const counters = { years: 0, students: 0 };
      s3Tl.to(counters, {
        years: 20,
        students: 4000,
        duration: 2.5,
        ease: 'power3.out',
        onUpdate: () => {
          document.getElementById('s3-counter-1').innerText = Math.floor(counters.years);
          document.getElementById('s3-counter-2').innerText = Math.floor(counters.students).toLocaleString('pt-BR');
        }
      }, 0.8);
    }

    // ========================================
    // SECTION 4: O MÉTODO — GSAP
    // ========================================

    const s4MetodoSection = document.getElementById('metodo');
    if (s4MetodoSection) {
      
      // Background Parallax
      gsap.to('.s4-bg-parallax', {
        scrollTrigger: {
          trigger: s4MetodoSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: '15%',
        ease: 'none'
      });

      // Progress Line Scrub
      const s4ListContainer = document.getElementById('s4-list-container');
      const s4ProgressLine = document.getElementById('s4-progress-line');
      
      if(s4ListContainer && s4ProgressLine) {
        gsap.to(s4ProgressLine, {
          scrollTrigger: {
            trigger: s4ListContainer,
            start: 'top 55%',
            end: 'bottom 65%',
            scrub: 0.3
          },
          scaleY: 1,
          ease: 'none'
        });
      }

      // Sequential Item Animation (Text & Numbers)
      const s4Items = gsap.utils.toArray('.s4-item');
      s4Items.forEach((item) => {
        const textBlock = item.querySelector('.s4-text-block');
        
        // Initial state for text block
        gsap.set(textBlock, { opacity: 0, x: -30 });

        // Add active class on scroll (triggers CSS transitions for number and icon)
        ScrollTrigger.create({
          trigger: item,
          start: 'top 75%',
          onEnter: () => item.classList.add('is-active'),
          onLeaveBack: () => item.classList.remove('is-active')
        });

        // Fade in text block from left
        gsap.to(textBlock, {
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // Reassurance block fade + translateY
      gsap.fromTo('.s4-reassurance', 
        { opacity: 0, y: 30 },
        { 
          scrollTrigger: {
            trigger: '.s4-reassurance',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power2.out' 
        }
      );
    }

    // ---- 7. FIX: REFRESH SCROLLTRIGGER ON LOAD ----
    // This prevents async image loading from misaligning the scroll triggers
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });

    const heroImg = document.querySelector('#heroTilt img');
    if (heroImg) {
      if (heroImg.complete) {
        ScrollTrigger.refresh();
      } else {
        heroImg.addEventListener('load', () => ScrollTrigger.refresh());
      }
    }

    // Re-initialize Lucide icons for newly added section
    lucide.createIcons();
});

document.addEventListener('DOMContentLoaded', () => {
      // 1. Criação das Partículas do Preço
      const priceContainer = document.querySelector('.price-container');
      if (priceContainer) {
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.classList.add('price-particle');
          // Rotate each particle around the center
          const angle = (i * (360 / particleCount));
          gsap.set(particle, { 
            rotation: angle, 
            y: 0 
          });
          priceContainer.appendChild(particle);
        }
      }

      // 2. Animação Dramática do Preço (ScrollTrigger)
      const priceBlock = document.getElementById('s5-price-block');
      const val27 = document.getElementById('s5-price-val');
      
      if (priceBlock && val27) {
        let tlOferta = gsap.timeline({
          scrollTrigger: {
            trigger: "#oferta",
            start: "top 40%",
            toggleActions: "play none none none"
          }
        });

        // Efeito de pulso de entrada no container do preço
        tlOferta.from(priceBlock, {
          scale: 0.7,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.5)"
        }, 0);

        // Contador de 0 a 27
        let counterObj = { val: 0 };
        tlOferta.to(counterObj, {
          val: 27,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: function() {
            val27.innerText = Math.floor(counterObj.val).toString().padStart(2, '0');
          }
        }, 0);

        // Explosão de Partículas exatamente quando chega no 27
        const particles = document.querySelectorAll('.price-particle');
        if (particles.length > 0) {
          tlOferta.to(particles, {
            y: -120, // Distância da explosão (para fora do centro)
            opacity: 0,
            scaleY: 0, // Encolhe ao final da explosão
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.02
          }, "-=0.2"); // Começa um pouco antes do número terminar de crescer
          
          tlOferta.set(particles, { opacity: 1, scaleY: 1 }, "-=1"); // Reseta no começo da explosão
        }
      }

      // 4. Efeito Line Draw na lista de "O que você recebe"
      const featIcons = document.querySelectorAll('.s5-feat-icon');
      if (featIcons.length > 0) {
        gsap.set(featIcons, { strokeDasharray: "100", strokeDashoffset: "100" });
        ScrollTrigger.create({
          trigger: "#s5-features",
          start: "top 70%",
          once: true,
          onEnter: () => {
            gsap.to(featIcons, {
              strokeDashoffset: 0,
              duration: 1.5,
              stagger: 0.2,
              ease: "power2.out"
            });
            gsap.from(".s5-feat-item", {
              y: 20,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "back.out(1.2)"
            });
          }
        });
      }

      // 5. Efeito Magnético no Botão (Vanilla JS)
      const magneticBtn = document.getElementById('magnetic-cta');
      if (magneticBtn) {
        // Checa se é touch device para desabilitar
        const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
        
        if (!isTouchDevice) {
          const moveArea = 100; // Raio em pixels para o botão começar a ser atraído
          const magnetStrength = 0.3; // Força do efeito (0.0 a 1.0)
          
          document.addEventListener('mousemove', (e) => {
            const rect = magneticBtn.getBoundingClientRect();
            // Calcula o centro do botão
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calcula a distância do mouse para o centro do botão
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Se o mouse estiver perto (área de "gravidade")
            if (distance < moveArea) {
              const x = distanceX * magnetStrength;
              const y = distanceY * magnetStrength;
              magneticBtn.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
            } else {
              // Reseta suavemente
              magneticBtn.style.transform = 'translate(0px, 0px) scale(1)';
            }
          });
          
          // Reseta quando o mouse sai da janela
          document.addEventListener('mouseleave', () => {
            magneticBtn.style.transform = 'translate(0px, 0px) scale(1)';
          });
        }
      }
      // 6. Accordion (FAQ)
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('is-open');
          
          // Fechar todos os outros
          faqItems.forEach(otherItem => {
            otherItem.classList.remove('is-open');
            otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          });
          
          // Se não estava aberto, abrir este
          if (!isOpen) {
            item.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      });
      // 7. Efeito Parallax nos Pontos de Luz e Bolhas
      const parallaxElements = document.querySelectorAll('.parallax-element');
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
        gsap.to(el, {
          y: () => (ScrollTrigger.maxScroll(window) * speed),
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true
          }
        });
      });
    });