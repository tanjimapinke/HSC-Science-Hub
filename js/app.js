/* =========================================================
   HSC SCIENCE HUB
   Main Application JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("show");

            const icon = menuBtn.querySelector("i");

            if (navLinks.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

        /* Close menu after clicking a link */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("show");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =====================================================
       DARK / LIGHT MODE
       ===================================================== */

    const themeToggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("hsc-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "hsc-theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();

        });

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        const isDark =
            document.body.classList.contains("dark-mode");

        if (isDark) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    }


    /* =====================================================
       HERO SEARCH
       ===================================================== */

    const heroSearch = document.getElementById("heroSearch");
    const searchBtn = document.getElementById("searchBtn");

    function performSearch() {

        if (!heroSearch) return;

        const query = heroSearch.value.trim();

        if (!query) {

            heroSearch.focus();

            return;

        }

        /*
         * The complete global search system will be connected
         * later when our content database is built.
         */

        localStorage.setItem(
            "hsc-last-search",
            query
        );

        window.location.href =
            `videos.html?search=${encodeURIComponent(query)}`;

    }


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            performSearch
        );

    }


    if (heroSearch) {

        heroSearch.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                performSearch();

            }

        });

    }


    /* =====================================================
       SIMPLE SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".subject-card, .roadmap-step, .feature-card, .score-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(element => {

            element.style.opacity = "0";
            element.style.transform = "translateY(18px)";
            element.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

            observer.observe(element);

        });

    }

});