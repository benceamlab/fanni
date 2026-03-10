document.addEventListener('DOMContentLoaded', () => {
            
    // 1. Navigáció megjelenése/eltűnése scroll alapján
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // 2. Sima görgetés (Smooth Scroll) a menüpontokra kattintva
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active') ? 'true' : 'false');
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // 3. Űrlap beküldés szimuláció
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Megakadályozza az oldal újratöltését
        
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerText;
        
        // Vizuális visszajelzés
        btn.innerText = 'Küldés...';
        btn.style.opacity = '0.7';
        
        // Szimulált szerver válaszidő
        setTimeout(() => {
            alert('Köszönöm a megkeresést! Hamarosan felveszem Önnel a kapcsolatot a megadott elérhetőségeken.');
            form.reset(); // Mezők törlése
            btn.innerText = originalText;
            btn.style.opacity = '1';
        }, 1500);
    });

    // A script tag-en belül, a DOMContentLoaded esemény végéhez add hozzá:

    // 4. Konzultáció carousel
    const consultationTrack = document.querySelector('.consultation-track');
    const consultationDots = document.querySelectorAll('#konzultacio .dot');
    const consultationSteps = document.querySelectorAll('.consultation-step');
    let currentConsultationIndex = 0;
    let consultationAutoplay;

    function updateConsultationCarousel(index) {
        consultationTrack.style.transform = `translateX(-${index * 100}%)`;
        consultationDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextConsultationSlide() {
        currentConsultationIndex = (currentConsultationIndex + 1) % consultationSteps.length;
        updateConsultationCarousel(currentConsultationIndex);
    }

    // Automatikus forgatás 5mp-enként
    consultationAutoplay = setInterval(nextConsultationSlide, 5000);

    // Pontokra kattintás
    consultationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentConsultationIndex = index;
            updateConsultationCarousel(currentConsultationIndex);
            
            // Újraindítjuk az automatikus forgatást
            clearInterval(consultationAutoplay);
            consultationAutoplay = setInterval(nextConsultationSlide, 5000);
        });
    });

    // 5. Esetek körös megjelenítés
const casesCircle = document.querySelector('.cases-circle');
const circleTexts = document.querySelectorAll('.circle-text');
const numberOfCases = circleTexts.length;
let currentCaseIndex = 0;
let casesAutoplay;

// Pontok létrehozása és pozicionálása
const radius = 200; // A kör sugara
for (let i = 0; i < numberOfCases; i++) {
    const dot = document.createElement('div');
    dot.classList.add('case-dot');
    dot.dataset.index = i;
    
    // Pontok pozícionálása egyenlő távolságra a kör kerületén
    const angle = (i / numberOfCases) * 2 * Math.PI - Math.PI / 2;
    const x = radius + radius * Math.cos(angle);
    const y = radius + radius * Math.sin(angle);
    
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.transform = 'translate(-50%, -50%)';
    
    casesCircle.appendChild(dot);
}

const caseDots = document.querySelectorAll('.case-dot');

function updateCasesDisplay(index) {
    // Szövegek frissítése
    circleTexts.forEach((text, i) => {
        text.classList.toggle('active', i === index);
    });
    
    // Pontok frissítése
    caseDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextCase() {
    currentCaseIndex = (currentCaseIndex + 1) % numberOfCases;
    updateCasesDisplay(currentCaseIndex);
}

// Automatikus váltás 5mp-enként
casesAutoplay = setInterval(nextCase, 5000);

// Pontra kattintás
caseDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentCaseIndex = index;
        updateCasesDisplay(currentCaseIndex);
        
        // Újraindítjuk az automatikus váltást
        clearInterval(casesAutoplay);
        casesAutoplay = setInterval(nextCase, 5000);
    });
});

// Első pont aktívvá tétele
updateCasesDisplay(0);

// 6. Esetek3 - Modern körös design
const casesWrapper = document.querySelector('.cases-modern-circle-wrapper');
const caseTitles = document.querySelectorAll('.case-title');
const caseDescriptions = document.querySelectorAll('.case-description');
const casesLearnMore = document.querySelector('.cases-learn-more');
const numberOfCases3 = caseTitles.length;
let currentCase3Index = 0;
let cases3Autoplay;

// SVG ikonok
const caseIcons = [
    //'<svg viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>',
    '<img src="images/goal.svg" style="width:24px;height:30px;">',//1
    //'<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
    '<img src="images/mirror.svg" style="width:24px;height:30px;">',//2
    //'<svg viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>',
    '<img src="images/lightning.svg" style="width:24px;height:30px;">',//3
    //'<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
    '<img src="images/hearth.svg" style="width:24px;height:30px;">',//4
    //'<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
    '<img src="images/candle.svg" style="width:24px;height:30px;">',//5
    //'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>',
    '<img src="images/handhold.svg" style="width:24px;height:30px;">',//6
    //'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>'
    '<img src="images/work.svg" style="width:24px;height:30px;">',//7
];

// Icon pontok létrehozása
const radius3 = 300;
for (let i = 0; i < numberOfCases3; i++) {
    const iconDot = document.createElement('div');
    iconDot.classList.add('case-icon-dot');
    iconDot.dataset.index = i;
    iconDot.innerHTML = caseIcons[i];
    
    const angle = (i / numberOfCases3) * 2 * Math.PI - Math.PI / 2;
    const x = radius3 + radius3 * Math.cos(angle);
    const y = radius3 + radius3 * Math.sin(angle);
    
    iconDot.style.left = `${x}px`;
    iconDot.style.top = `${y}px`;
    iconDot.style.transform = 'translate(-50%, -50%)';
    
    if (i === 0) iconDot.classList.add('active');
    
    casesWrapper.appendChild(iconDot);
}

const caseIconDots = document.querySelectorAll('.case-icon-dot');

function updateCases3Display(index) {
    caseTitles.forEach((title, i) => {
        title.classList.toggle('active', i === index);
    });
    
    caseDescriptions.forEach((desc, i) => {
        desc.classList.toggle('active', i === index);
    });
    
    caseIconDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    casesLearnMore.classList.remove('active');
    setTimeout(() => casesLearnMore.classList.add('active'), 100);
}

function nextCase3() {
    currentCase3Index = (currentCase3Index + 1) % numberOfCases3;
    updateCases3Display(currentCase3Index);
}

cases3Autoplay = setInterval(nextCase3, 8000);

caseIconDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentCase3Index = index;
        updateCases3Display(currentCase3Index);
        clearInterval(cases3Autoplay);
        cases3Autoplay = setInterval(nextCase3, 8000);
    });
});

updateCases3Display(0);
});