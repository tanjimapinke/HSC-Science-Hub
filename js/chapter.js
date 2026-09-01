/* =========================================================
   HSC SCIENCE HUB
   Chapter Page JavaScript
   ========================================================= */


/* =========================================================
   SUBJECT DATA
========================================================= */

const subjects = {

    physics: {
        name: "Physics",
        icon: "⚛",
        chapters: [
            "Physical World and Measurement",
            "Vector",
            "Dynamics",
            "Newtonian Mechanics",
            "Work, Energy and Power",
            "Gravitation and Gravity",
            "Structural Properties of Matter",
            "Periodic Motion",
            "Wave",
            "Ideal Gas and Kinetic Theory",
            "Thermodynamics",
            "Electrostatics",
            "Current Electricity",
            "Magnetic Effect of Current"
        ]
    },

    chemistry: {
        name: "Chemistry",
        icon: "🧪",
        chapters: [
            "Safe Use of Laboratory",
            "Qualitative Chemistry",
            "Periodic Properties of Elements",
            "Chemical Changes",
            "Action-Oriented Chemistry",
            "Environmental Chemistry",
            "Organic Chemistry",
            "Quantitative Chemistry",
            "Electrochemistry",
            "Economic Chemistry",
            "Industrial Chemistry",
            "Applied Chemistry"
        ]
    },

    "higher-math": {
        name: "Higher Mathematics",
        icon: "∑",
        chapters: [
            "Matrices and Determinants",
            "Vector",
            "Straight Line",
            "Circle",
            "Permutation and Combination",
            "Trigonometric Ratios",
            "Associated Angles",
            "Functions",
            "Differentiation",
            "Integration",
            "Real Numbers and Inequalities",
            "Complex Numbers",
            "Probability",
            "Statistics"
        ]
    },

    biology: {
        name: "Biology",
        icon: "🧬",
        chapters: [
            "Cell and Its Structure",
            "Cell Division",
            "Cell Chemistry",
            "Microorganisms",
            "Algae and Fungi",
            "Bryophyta and Pteridophyta",
            "Gymnosperms and Angiosperms",
            "Tissue and Tissue System",
            "Plant Physiology",
            "Reproduction",
            "Genetics and Evolution",
            "Ecology and Environment"
        ]
    },

    ict: {
        name: "ICT",
        icon: "💻",
        chapters: [
            "Information and Communication Technology",
            "Communication Systems and Networking",
            "Number Systems and Digital Devices",
            "Web Design and HTML",
            "Programming Language",
            "Database Management System"
        ]
    }

};


/* =========================================================
   CHAPTER DESCRIPTIONS
========================================================= */

const chapterDescriptions = {

    "physics-1":
        "Learn about physical quantities, units, measurement systems, dimensions and measurement errors.",

    "physics-2":
        "Understand vectors, vector operations, resolution of vectors and their applications.",

    "physics-3":
        "Study motion, force, momentum and the fundamental principles of dynamics.",

    "physics-4":
        "Learn Newton's laws of motion and their applications to different physical situations.",

    "physics-5":
        "Understand work, energy, power and the relationship between these important physical quantities.",

    "physics-6":
        "Study gravitational force, acceleration due to gravity, satellites and related concepts.",

    "chemistry-1":
        "Learn laboratory safety rules, equipment, symbols and safe handling of chemicals.",

    "chemistry-2":
        "Understand qualitative analysis and methods used to identify chemical substances.",

    "chemistry-3":
        "Explore periodic properties and understand how properties change across the periodic table.",

    "chemistry-4":
        "Study chemical reactions, equilibrium and factors affecting chemical changes.",

    "biology-1":
        "Explore the structure of cells, cell organelles and their important functions.",

    "biology-2":
        "Understand mitosis, meiosis and the importance of cell division.",

    "biology-3":
        "Study the chemical components of living organisms including carbohydrates, proteins and lipids.",

    "ict-1":
        "Learn the basic concepts of information and communication technology.",

    "ict-2":
        "Understand communication systems, networks, data transmission and networking concepts.",

    "ict-3":
        "Study number systems, logic gates and digital devices.",

    "ict-4":
        "Learn HTML, web page structure and the basic principles of web design.",

    "ict-5":
        "Understand programming concepts, algorithms, variables, conditions and loops.",

    "ict-6":
        "Learn database concepts, tables, relationships and database management."

};


/* =========================================================
   URL PARAMETERS
========================================================= */

const params =
    new URLSearchParams(window.location.search);

const requestedSubject =
    params.get("subject") || "physics";

const requestedChapter =
    parseInt(params.get("chapter")) || 1;


/* =========================================================
   SELECT SUBJECT
========================================================= */

const subject =
    subjects[requestedSubject]
        ? subjects[requestedSubject]
        : subjects.physics;

const subjectKey =
    subjects[requestedSubject]
        ? requestedSubject
        : "physics";

const chapters =
    subject.chapters;


/* =========================================================
   CURRENT CHAPTER
========================================================= */

const currentIndex =
    Math.min(
        Math.max(requestedChapter - 1, 0),
        chapters.length - 1
    );

const currentChapter =
    chapters[currentIndex];


/* =========================================================
   PAGE TITLE
========================================================= */

document.title =
    `${currentChapter} | HSC Science Hub`;


/* =========================================================
   UPDATE HEADER
========================================================= */

const chapterIcon =
    document.getElementById("chapterIcon");

if (chapterIcon) {
    chapterIcon.textContent =
        subject.icon;
}


const subjectName =
    document.getElementById("subjectName");

if (subjectName) {
    subjectName.textContent =
        subject.name.toUpperCase();
}


const chapterNumber =
    document.getElementById("chapterNumber");

if (chapterNumber) {
    chapterNumber.textContent =
        `CHAPTER ${String(currentIndex + 1).padStart(2, "0")}`;
}


const breadcrumbChapter =
    document.getElementById("breadcrumbChapter");

if (breadcrumbChapter) {
    breadcrumbChapter.textContent =
        `Chapter ${String(currentIndex + 1).padStart(2, "0")}`;
}


const chapterTitle =
    document.getElementById("chapterTitle");

if (chapterTitle) {
    chapterTitle.textContent =
        currentChapter;
}


/* =========================================================
   DESCRIPTION
========================================================= */

const descriptionKey =
    `${subjectKey}-${currentIndex + 1}`;

const chapterDescription =
    document.getElementById("chapterDescription");

if (chapterDescription) {

    chapterDescription.textContent =
        chapterDescriptions[descriptionKey] ||
        `Explore ${currentChapter} through easy notes, important concepts, formulas, videos and practice questions.`;

}


/* =========================================================
   SUBJECT LINK
========================================================= */

const subjectLink =
    document.getElementById("subjectLink");

if (subjectLink) {

    subjectLink.textContent =
        subject.name;

    subjectLink.href =
        `subject.html?subject=${subjectKey}`;

}


/* =========================================================
   OVERVIEW
========================================================= */

const overviewTitle =
    document.getElementById("overviewTitle");

if (overviewTitle) {

    overviewTitle.textContent =
        `What You Will Learn in ${currentChapter}`;

}


const overviewText =
    document.getElementById("overviewText");

if (overviewText) {

    overviewText.textContent =
        `This chapter covers the important concepts of ${currentChapter}. Use the notes, formulas, videos and practice resources to strengthen your understanding and prepare for the HSC examination.`;

}


/* =========================================================
   TOPICS
========================================================= */

const topicList =
    document.getElementById("topicList");

if (topicList) {

    topicList.innerHTML = "";

    const topics = [

        `Basic concepts of ${currentChapter}`,
        "Important definitions and principles",
        "Key examples and applications",
        "Important HSC examination topics"

    ];

    topics.forEach(topic => {

        const li =
            document.createElement("li");

        li.innerHTML = `
            <i class="fa-solid fa-check"></i>
            ${topic}
        `;

        topicList.appendChild(li);

    });

}


/* =========================================================
   PROGRESS
========================================================= */

const storageKey =
    `hsc-progress-${subjectKey}-${currentIndex + 1}`;

let progress =
    parseInt(
        localStorage.getItem(storageKey) || "0"
    );

progress =
    Math.min(
        Math.max(progress, 0),
        100
    );


const progressText =
    document.getElementById("progressText");

const progressFill =
    document.getElementById("progressFill");

if (progressText) {
    progressText.textContent =
        `${progress}%`;
}

if (progressFill) {
    progressFill.style.width =
        `${progress}%`;
}


/* =========================================================
   PREVIOUS CHAPTER
========================================================= */

const previousChapter =
    document.getElementById("previousChapter");

if (previousChapter) {

    if (currentIndex > 0) {

        previousChapter.href =
            `chapter.html?subject=${subjectKey}&chapter=${currentIndex}`;

        const previousTitle =
            previousChapter.querySelector("strong");

        if (previousTitle) {
            previousTitle.textContent =
                chapters[currentIndex - 1];
        }

    } else {

        previousChapter.style.visibility =
            "hidden";

    }

}


/* =========================================================
   NEXT CHAPTER
========================================================= */

const nextChapter =
    document.getElementById("nextChapter");

if (nextChapter) {

    if (currentIndex < chapters.length - 1) {

        nextChapter.href =
            `chapter.html?subject=${subjectKey}&chapter=${currentIndex + 2}`;

        const nextTitle =
            nextChapter.querySelector("strong");

        if (nextTitle) {
            nextTitle.textContent =
                chapters[currentIndex + 1];
        }

    } else {

        nextChapter.style.visibility =
            "hidden";

    }

}


/* =========================================================
   TAB SYSTEM
========================================================= */

const tabs =
    document.querySelectorAll(".chapter-tab");

const sections =
    document.querySelectorAll(".chapter-section");


tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target =
            tab.dataset.section;

        tabs.forEach(item => {

            item.classList.remove("active");

        });

        sections.forEach(section => {

            section.classList.remove("active");

        });

        tab.classList.add("active");

        const targetSection =
            document.getElementById(target);

        if (targetSection) {

            targetSection.classList.add("active");

            window.scrollTo({

                top:
                    targetSection.offsetTop - 140,

                behavior:
                    "smooth"

            });

        }

    });

});


/* =========================================================
   QUICK RESOURCE LINKS
========================================================= */

document.querySelectorAll(
    ".chapter-sidebar a"
).forEach(link => {

    link.addEventListener("click", event => {

        const href =
            link.getAttribute("href");

        if (!href || !href.startsWith("#")) {
            return;
        }

        event.preventDefault();

        const target =
            href.substring(1);

        const targetTab =
            document.querySelector(
                `.chapter-tab[data-section="${target}"]`
            );

        if (targetTab) {
            targetTab.click();
        }

    });

});


/* =========================================================
   VIDEO MESSAGE
========================================================= */

function showVideoMessage() {

    alert(
        "Video lessons will be added soon. Stay tuned!"
    );

}


/* =========================================================
   COPY FORMULA
========================================================= */

function copyFormula(formula) {

    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard.writeText(formula)

            .then(() => {

                alert("Formula copied!");

            })

            .catch(() => {

                alert("Unable to copy formula.");

            });

    } else {

        alert("Copy is not supported in this browser.");

    }

}


/* =========================================================
   THEME
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("hsc-theme");


if (
    savedTheme === "dark" &&
    document.body
) {

    document.body.classList.add("dark-mode");

}


function updateChapterThemeIcon() {

    if (!themeToggle) return;

    const icon =
        themeToggle.querySelector("i");

    if (!icon) return;

    const isDark =
        document.body.classList.contains("dark-mode");

    icon.classList.toggle("fa-sun", isDark);
    icon.classList.toggle("fa-moon", !isDark);

}


updateChapterThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "hsc-theme",
            isDark ? "dark" : "light"
        );

        updateChapterThemeIcon();

    });

}


/* =========================================================
   MARK CHAPTER COMPLETE
   Ctrl + Enter
========================================================= */

document.addEventListener("keydown", event => {

    if (
        event.ctrlKey &&
        event.key.toLowerCase() === "enter"
    ) {

        localStorage.setItem(
            storageKey,
            "100"
        );

        if (progressText) {

            progressText.textContent =
                "100%";

        }

        if (progressFill) {

            progressFill.style.width =
                "100%";

        }

    }

});


/* =========================================================
   CHAPTER DATA AVAILABLE GLOBALLY
========================================================= */

window.HSCChapter = {

    subject,
    subjectKey,
    chapters,
    currentChapter,
    currentIndex

};