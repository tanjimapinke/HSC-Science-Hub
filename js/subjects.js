/* =========================================================
   HSC SCIENCE HUB — SUBJECTS PAGE
   subjects.js
   Loads subject data from data/subjects.json
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const subjectGrid =
        document.getElementById("subjectGrid");

    const subjectSearch =
        document.getElementById("subjectSearch");

    const emptyState =
        document.getElementById("emptyState");


    /* =====================================================
       SUBJECT DATA
    ===================================================== */

    let subjects = [];


    /* =====================================================
       LOAD SUBJECTS JSON
    ===================================================== */

    async function loadSubjects() {

        try {

            const response =
                await fetch("data/subjects.json");

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }

            const data =
                await response.json();


            /*
             * Support both:
             *
             * 1. Array format
             * 2. Object format
             */

            if (Array.isArray(data)) {

                subjects = data;

            } else {

                subjects =
                    Object.entries(data).map(
                        ([key, subject]) => ({

                            key: key,

                            ...subject

                        })
                    );

            }


            renderSubjects(subjects);

        } catch (error) {

            console.error(
                "Unable to load subjects.json:",
                error
            );


            if (subjectGrid) {

                subjectGrid.innerHTML = `

                    <div class="empty-state">

                        <div class="empty-icon">

                            <i class="fa-solid fa-triangle-exclamation"></i>

                        </div>

                        <h3>
                            Unable to load subjects
                        </h3>

                        <p>
                            Please check that
                            <strong>data/subjects.json</strong>
                            exists and is correctly formatted.
                        </p>

                    </div>

                `;

            }

        }

    }



    /* =====================================================
       RENDER SUBJECTS
    ===================================================== */

    function renderSubjects(subjectList) {

        if (!subjectGrid) return;


        subjectGrid.innerHTML = "";


        if (!subjectList.length) {

            if (emptyState) {
                emptyState.style.display = "block";
            }

            return;

        }


        if (emptyState) {
            emptyState.style.display = "none";
        }


        subjectList.forEach(
            (subject, index) => {

                const key =
                    subject.key ||
                    subject.slug ||
                    createSlug(subject.name);


                const name =
                    subject.name ||
                    "Subject";


                const icon =
                    subject.icon ||
                    "fa-book";


                const description =
                    subject.description ||
                    `Explore ${name} chapters and learning resources.`;


                const chapters =
                    Array.isArray(subject.chapters)
                        ? subject.chapters
                        : [];


                const card =
                    document.createElement("a");


                card.className =
                    "subject-card";


                card.href =
                    `subject.html?subject=${encodeURIComponent(key)}`;


                card.innerHTML = `

                    <div class="subject-card-top">

                        <div class="subject-card-icon">

                            <i class="fa-solid ${icon}"></i>

                        </div>

                        <span class="subject-card-number">

                            ${String(index + 1).padStart(2, "0")}

                        </span>

                    </div>


                    <div class="subject-card-content">

                        <span class="subject-card-label">

                            HSC SCIENCE

                        </span>


                        <h3>
                            ${escapeHTML(name)}
                        </h3>


                        <p>
                            ${escapeHTML(description)}
                        </p>


                        <div class="subject-card-meta">

                            <span>

                                <i class="fa-solid fa-layer-group"></i>

                                ${chapters.length} Chapters

                            </span>


                            <span>

                                <i class="fa-solid fa-book-open"></i>

                                ${escapeHTML(subject.papers || "Complete Course")}

                            </span>

                        </div>

                    </div>


                    <div class="subject-card-footer">

                        <span>
                            Explore Subject
                        </span>

                        <i class="fa-solid fa-arrow-right"></i>

                    </div>

                `;


                subjectGrid.appendChild(card);

            }
        );

    }



    /* =====================================================
       SEARCH
    ===================================================== */

    if (subjectSearch) {

        subjectSearch.addEventListener(
            "input",
            () => {

                const query =
                    subjectSearch.value
                        .toLowerCase()
                        .trim();


                const filtered =
                    subjects.filter(subject => {

                        const name =
                            String(
                                subject.name || ""
                            ).toLowerCase();


                        const description =
                            String(
                                subject.description || ""
                            ).toLowerCase();


                        return (
                            name.includes(query) ||
                            description.includes(query)
                        );

                    });


                renderSubjects(filtered);

            }
        );

    }



    /* =====================================================
       CREATE SLUG
    ===================================================== */

    function createSlug(text) {

        return String(text)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");

    }



    /* =====================================================
       HTML SAFETY
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }



    /* =====================================================
       START
    ===================================================== */

    loadSubjects();

});