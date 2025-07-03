document.addEventListener("DOMContentLoaded", () => {
    // --- HERO LETTER ANIMATION ---
    const title = document.querySelector(".hero-title");
    title.innerHTML = title.textContent.replace(/[^\s]/g, "<span class='letter'>$&</span>");

    anime
        .timeline({ loop: false })
        .add({
            targets: ".hero-title .letter",
            translateY: [100, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1500,
            delay: (el, i) => 30 * i,
        })
        .add({
            targets: ".scroll-down",
            opacity: [0, 1],
            duration: 600,
            easing: "easeInOutQuad",
        });

    // --- SCROLL REVEAL ---
    const revealEls = document.querySelectorAll("section, nav");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [40, 0],
                        duration: 800,
                        easing: "easeOutExpo",
                        delay: 100,
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealEls.forEach((el) => {
        el.style.opacity = 0;
        observer.observe(el);
    });


    // --- LANGUAGE SWITCHER ---
    const langSelect = document.getElementById("lang-select");

    langSelect.addEventListener("change", (e) => {
        const lang = e.target.value;

        if (lang === "en") {
            restoreDefaultLanguage();
        } else {
            fetch(`lang/${lang}.json`)
                .then((res) => res.json())
                .then((translations) => {
                    const elements = document.querySelectorAll("[data-key]");
                    elements.forEach((el) => {
                        const key = el.getAttribute("data-key");
                        if (translations[key]) {
                            el.innerHTML = translations[key];
                        }
                    });
                })
                .catch((err) => console.error("Ошибка загрузки перевода:", err));
        }
    });

    function restoreDefaultLanguage() {
        const elements = document.querySelectorAll("[data-key]");
        elements.forEach((el) => {
            const defaultText = el.getAttribute("data-default");
            if (defaultText) {
                el.innerHTML = defaultText;
            }
        });
    }

    const elements = document.querySelectorAll("[data-key]");
    elements.forEach((el) => {
        el.setAttribute("data-default", el.innerHTML);
    });

    // --- Burger menu toggle ---
    const burger = document.getElementById("burger");
    const navLinks = document.getElementById("nav-links");

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
});

// --- Timeline Animation ---
const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: "easeOutExpo",
                    delay: i * 100,
                });
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

timelineItems.forEach((item) => {
    timelineObserver.observe(item);
});
