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