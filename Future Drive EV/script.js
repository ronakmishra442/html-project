/* ==========================================
   FUTUREDRIVE 2026
   MAIN JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initThemeToggle();
    initMobileMenu();
    initNavbarScroll();
    initFAQ();
    initCounters();
    initScrollReveal();
    initRippleEffect();
    initSmoothScrolling();
    initActiveNavLinks();
    initContactForm();
    initHeroSlider();

});

/* ==========================================
   THEME TOGGLE
========================================== */

function initThemeToggle() {

    const themeBtn = document.getElementById("themeToggle");

    if (!themeBtn) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");
        themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");

        themeBtn.innerHTML = isLight
            ? `<i class="fa-solid fa-sun"></i>`
            : `<i class="fa-solid fa-moon"></i>`;

        localStorage.setItem(
            "theme",
            isLight ? "light" : "dark"
        );
    });
}

/* ==========================================
   MOBILE MENU
========================================== */

function initMobileMenu() {

    const menuBtn =
        document.getElementById("menuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (mobileMenu.classList.contains("active")) {

            icon.className =
                "fa-solid fa-xmark";
        } else {

            icon.className =
                "fa-solid fa-bars";
        }
    });

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuBtn.innerHTML =
                    `<i class="fa-solid fa-bars"></i>`;
            });
        });
}

/* ==========================================
   NAVBAR SCROLL EFFECT
========================================== */

function initNavbarScroll() {

    const header =
        document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");
        }
    });
}

/* ==========================================
   FAQ ACCORDION
========================================== */

function initFAQ() {

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            faqItems.forEach(faq => {

                if (faq !== item) {

                    faq.classList.remove("active");
                }
            });

            item.classList.toggle("active");
        });
    });
}

/* ==========================================
   COUNTER ANIMATION
========================================== */

function initCounters() {

    const counters =
        document.querySelectorAll(".counter");

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

    counters.forEach(counter =>
        observer.observe(counter)
    );
}

function animateCounter(counter) {

    const target =
        Number(counter.dataset.target);

    let count = 0;

    const speed = target / 200;

    const update = () => {

        count += speed;

        if (count < target) {

            counter.textContent =
                formatNumber(Math.floor(count));

            requestAnimationFrame(update);

        } else {

            counter.textContent =
                formatNumber(target);
        }
    };

    update();
}

function formatNumber(num) {

    if (num >= 1000000) {

        return (num / 1000000).toFixed(0) + "M+";
    }

    if (num >= 1000) {

        return (num / 1000).toFixed(0) + "K+";
    }

    return num;
}

/* ==========================================
   SCROLL REVEAL
========================================== */

function initScrollReveal() {

    const elements = document.querySelectorAll(
        ".vehicle-card, .tech-card, .energy-box, .stat, .faq-item"
    );

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");
                }
            });

        }, {
            threshold: 0.15
        });

    elements.forEach(el => {

        el.classList.add("hidden");

        observer.observe(el);
    });
}

/* ==========================================
   RIPPLE BUTTON EFFECT
========================================== */

function initRippleEffect() {

    const buttons =
        document.querySelectorAll(".btn");

    buttons.forEach(button => {

        button.addEventListener("click", e => {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                button.getBoundingClientRect();

            const size =
                Math.max(rect.width, rect.height);

            ripple.style.width =
                ripple.style.height =
                size + "px";

            ripple.style.left =
                e.clientX - rect.left - size / 2 + "px";

            ripple.style.top =
                e.clientY - rect.top - size / 2 + "px";

            button.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 700);
        });
    });
}

/* ==========================================
   SMOOTH SCROLLING
========================================== */

function initSmoothScrolling() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", e => {

                e.preventDefault();

                const target =
                    document.querySelector(
                        anchor.getAttribute("href")
                    );

                if (!target) return;

                target.scrollIntoView({
                    behavior: "smooth"
                });
            });
        });
}

/* ==========================================
   ACTIVE NAV LINKS
========================================== */

function initActiveNavLinks() {

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top =
                section.offsetTop - 120;

            const height =
                section.offsetHeight;

            if (
                pageYOffset >= top &&
                pageYOffset < top + height
            ) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {
                link.classList.add("active");
            }
        });
    });
}

/* ==========================================
   CONTACT FORM
========================================== */

function initContactForm() {

    const form =
        document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", e => {

        e.preventDefault();

        const inputs =
            form.querySelectorAll(
                "input, textarea"
            );

        let valid = true;

        inputs.forEach(input => {

            if (
                input.value.trim() === ""
            ) {

                valid = false;

                input.style.borderColor =
                    "red";

            } else {

                input.style.borderColor =
                    "";
            }
        });

        if (!valid) {

            alert(
                "Please fill all required fields."
            );

            return;
        }

        alert(
            "Message sent successfully!"
        );

        form.reset();
    });
}

/* ==========================================
   HERO BACKGROUND SLIDER
========================================== */

function initHeroSlider() {

    const hero =
        document.querySelector(".hero");

    if (!hero) return;

    const slides = [

        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920",

        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920",

        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1920"
    ];

    let current = 0;

    setInterval(() => {

        current++;

        if (current >= slides.length) {

            current = 0;
        }

        hero.style.backgroundImage =
            `url(${slides[current]})`;

    }, 5000);
}

/* ==========================================
   PARALLAX EFFECT
========================================== */

window.addEventListener("scroll", () => {

    const hero =
        document.querySelector(".hero");

    if (!hero) return;

    const offset =
        window.pageYOffset;

    hero.style.backgroundPositionY =
        offset * 0.5 + "px";
});

/* ==========================================
   LOADER SUPPORT (OPTIONAL)
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add(
        "loaded"
    );
});

/* ==========================================
   FUTUREDRIVE 2026 END
========================================== */