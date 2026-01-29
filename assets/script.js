document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
        "hop",
        "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );

    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const links = document.querySelectorAll(".link");
    const socialLinks = document.querySelectorAll(".socials p");
    let isAnimating = false;

    const splitTextIntoSpans = (selector) => {
        let elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            let text = element.innerText;
            let splitText = text
                .split("")
                .map((char) => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
                .join("");
            element.innerHTML = splitText;
        });
    };

    splitTextIntoSpans(".header h1");

    // ---------- Epic Hero entrance ----------
    splitTextIntoSpans(".hero-title-inner");
    const heroLabel = document.querySelector(".hero-label");
    const heroTitleSpans = document.querySelectorAll(".hero-title-inner span");
    const heroLineAccent = document.querySelector(".hero-line-accent");
    const heroTagline = document.querySelector(".hero-tagline");
    const heroLink = document.querySelector(".hero-link");
    const heroScroll = document.querySelector(".hero-scroll");
    const heroLine = document.querySelector(".hero-line");

    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
        .to(heroLabel, { y: 0, opacity: 0.7, duration: 0.8 }, 0.2)
        .to(heroTitleSpans, {
            y: "0%",
            stagger: 0.06,
            duration: 0.9,
            ease: "power4.out",
        }, 0.35)
        .to(heroLineAccent, { scaleX: 1, opacity: 1, duration: 0.5 }, 0.85)
        .to(heroTagline, { y: 0, opacity: 1, duration: 0.7 }, 0.9)
        .to(heroLink, { y: 0, opacity: 1, duration: 0.6 }, 1.1)
        .to(heroScroll, { y: 0, opacity: 0.8, duration: 0.5 }, 1.2)
        .to(heroLine, { opacity: 1, duration: 0.8 }, 1.3);

    menuToggle.addEventListener("click", () => {
        if (isAnimating) return;

        if (menuToggle.classList.contains("closed")) {
            menuToggle.classList.remove("closed");
            menuToggle.classList.add("opened");

            isAnimating = true;
            gsap.to(menu, {
                clipPath: "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)",
                ease: "hop",
                duration: 1.5,
                onStart: () => {
                    menu.style.pointerEvents = "all";
                },
                onComplete: () => {
                    isAnimating = false;
                },
            });

            gsap.fromTo(links,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, delay: 0.85, duration: 1, ease: "power3.out" }
            );

            gsap.fromTo(socialLinks,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, delay: 0.85, duration: 1, ease: "power3.out" }
            );

            gsap.to(".video-wrapper", {
                clipPath: "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)",
                ease: "hop",
                duration: 1.5,
                delay: 0.5,
            });

            gsap.fromTo(".header h1 span",
                { rotateY: 90, y: 10, scale: 0.9 },
                { rotateY: 0, y: 0, scale: 1, stagger: 0.05, delay: 0.5, duration: 1.5, ease: "power4.out" }
            );

        } else {
            menuToggle.classList.remove("opened");
            menuToggle.classList.add("closed");

            isAnimating = true;

            // Close menu animation
            gsap.to(menu, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                ease: "hop",
                duration: 1.5,
                onStart: () => {
                    menu.style.pointerEvents = "none";
                },
                onComplete: () => {
                    isAnimating = false;
                },
            });

            // Reset animations when closing
            gsap.to(links, { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" });
            gsap.to(socialLinks, { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" });
            gsap.to(".video-wrapper", { clipPath: "polygon(0% 100%,100% 100%,100% 100%,0% 100%)", duration: 1 });
            gsap.to(".header h1 span", { rotateY: 90, y: 10, scale: 0.9, duration: 0.5, ease: "power4.out" });
        }
    });
});
