/* =========================================================
   HSC SCIENCE HUB
   Dashboard JavaScript
   ========================================================= */


/* =========================================================
   DASHBOARD DATA
========================================================= */

const dashboardSubjects = {

    physics: {
        name: "Physics",
        icon: "fa-atom",
        chapters: 14
    },

    chemistry: {
        name: "Chemistry",
        icon: "fa-flask",
        chapters: 12
    },

    mathematics: {
        name: "Higher Mathematics",
        icon: "fa-square-root-variable",
        chapters: 14
    },

    biology: {
        name: "Biology",
        icon: "fa-dna",
        chapters: 12
    },

    ict: {
        name: "ICT",
        icon: "fa-laptop-code",
        chapters: 6
    }

};


/* =========================================================
   STORAGE KEYS
========================================================= */

const DASHBOARD_PROGRESS_KEY =
    "hsc-dashboard-progress";

const DASHBOARD_NAME_KEY =
    "hsc-student-name";

const DASHBOARD_ACTIVITY_KEY =
    "hsc-recent-activity";


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function getChapterProgress(subjectKey, chapterNumber) {

    const key =
        `hsc-progress-${subjectKey}-${chapterNumber}`;

    return parseInt(
        localStorage.getItem(key) || "0"
    );

}


function getSubjectProgress(subjectKey) {

    const subject =
        dashboardSubjects[subjectKey];

    if (!subject) return 0;

    let total = 0;

    for (
        let i = 1;
        i <= subject.chapters;
        i++
    ) {

        total +=
            getChapterProgress(subjectKey, i);

    }

    return Math.round(
        total / subject.chapters
    );

}


function getOverallProgress() {

    const subjectKeys =
        Object.keys(dashboardSubjects);

    let total = 0;

    subjectKeys.forEach(key => {

        total +=
            getSubjectProgress(key);

    });

    return Math.round(
        total / subjectKeys.length
    );

}


/* =========================================================
   STUDENT NAME
========================================================= */

const studentName =
    document.getElementById("studentName");

const storedName =
    localStorage.getItem(
        DASHBOARD_NAME_KEY
    );


if (studentName && storedName) {

    studentName.textContent =
        storedName;

}


/* =========================================================
   NAME EDIT
========================================================= */

const editNameBtn =
    document.getElementById("editNameBtn");


if (editNameBtn) {

    editNameBtn.addEventListener(
        "click",
        () => {

            const currentName =
                localStorage.getItem(
                    DASHBOARD_NAME_KEY
                ) || "Student";


            const newName =
                prompt(
                    "Enter your name:",
                    currentName
                );


            if (
                newName !== null &&
                newName.trim() !== ""
            ) {

                const cleanName =
                    newName.trim();


                localStorage.setItem(
                    DASHBOARD_NAME_KEY,
                    cleanName
                );


                if (studentName) {

                    studentName.textContent =
                        cleanName;

                }

            }

        }
    );

}


/* =========================================================
   OVERALL PROGRESS
========================================================= */

const overallProgress =
    getOverallProgress();


const progressValue =
    document.getElementById(
        "overallProgress"
    );


const progressCircle =
    document.getElementById(
        "progressCircle"
    );


if (progressValue) {

    progressValue.textContent =
        `${overallProgress}%`;

}


if (progressCircle) {

    progressCircle.style.setProperty(
        "--progress",
        `${overallProgress}%`
    );

}


/* =========================================================
   PROGRESS BARS
========================================================= */

function updateProgressElement(
    element,
    progress
) {

    if (!element) return;

    element.style.width =
        `${progress}%`;

}


/* =========================================================
   SUBJECT PROGRESS CARDS
========================================================= */

document.querySelectorAll(
    "[data-subject]"
).forEach(card => {

    const subjectKey =
        card.dataset.subject;


    const progress =
        getSubjectProgress(
            subjectKey
        );


    const progressText =
        card.querySelector(
            "[data-progress-text]"
        );


    const progressBar =
        card.querySelector(
            "[data-progress-bar]"
        );


    if (progressText) {

        progressText.textContent =
            `${progress}%`;

    }


    updateProgressElement(
        progressBar,
        progress
    );

});


/* =========================================================
   STATISTICS
========================================================= */

let completedChapters = 0;
let totalChapters = 0;


Object.keys(
    dashboardSubjects
).forEach(subjectKey => {

    const subject =
        dashboardSubjects[
            subjectKey
        ];


    totalChapters +=
        subject.chapters;


    for (
        let i = 1;
        i <= subject.chapters;
        i++
    ) {

        const progress =
            getChapterProgress(
                subjectKey,
                i
            );


        if (progress >= 100) {

            completedChapters++;

        }

    }

});


const completedChapterElement =
    document.getElementById(
        "completedChapters"
    );


const totalChapterElement =
    document.getElementById(
        "totalChapters"
    );


if (completedChapterElement) {

    completedChapterElement.textContent =
        completedChapters;

}


if (totalChapterElement) {

    totalChapterElement.textContent =
        totalChapters;

}


/* =========================================================
   CONTINUE LEARNING
========================================================= */

function getLastLearningData() {

    const saved =
        localStorage.getItem(
            "hsc-last-learning"
        );

    if (!saved) return null;


    try {

        return JSON.parse(saved);

    } catch {

        return null;

    }

}


const lastLearning =
    getLastLearningData();


const continueButton =
    document.getElementById(
        "continueLearning"
    );


if (
    continueButton &&
    lastLearning &&
    lastLearning.subject &&
    lastLearning.chapter
) {

    continueButton.href =
        `chapter.html?subject=${lastLearning.subject}&chapter=${lastLearning.chapter}`;

}


/* =========================================================
   SAVE LAST LEARNING
========================================================= */

function saveLastLearning(
    subjectKey,
    chapterNumber
) {

    localStorage.setItem(
        "hsc-last-learning",
        JSON.stringify({

            subject: subjectKey,

            chapter: chapterNumber

        })
    );

}


/* =========================================================
   CHAPTER LINKS
========================================================= */

document.querySelectorAll(
    "a[href*='chapter.html']"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            const url =
                new URL(
                    link.href,
                    window.location.href
                );


            const subject =
                url.searchParams.get(
                    "subject"
                );


            const chapter =
                url.searchParams.get(
                    "chapter"
                );


            if (
                subject &&
                chapter
            ) {

                saveLastLearning(
                    subject,
                    chapter
                );

            }

        }
    );

});


/* =========================================================
   RECENT ACTIVITY
========================================================= */

function getRecentActivity() {

    const saved =
        localStorage.getItem(
            DASHBOARD_ACTIVITY_KEY
        );


    if (!saved) return [];


    try {

        const data =
            JSON.parse(saved);

        return Array.isArray(data)
            ? data
            : [];

    } catch {

        return [];

    }

}


function saveActivity(activity) {

    let activities =
        getRecentActivity();


    activities.unshift(
        activity
    );


    activities =
        activities.slice(
            0,
            10
        );


    localStorage.setItem(
        DASHBOARD_ACTIVITY_KEY,
        JSON.stringify(
            activities
        )
    );

}


/* =========================================================
   RENDER RECENT ACTIVITY
========================================================= */

const activityContainer =
    document.getElementById(
        "recentActivity"
    );


function renderRecentActivity() {

    if (!activityContainer) {
        return;
    }


    const activities =
        getRecentActivity();


    if (activities.length === 0) {

        activityContainer.innerHTML = `

            <div class="empty-activity">

                <i class="fa-solid fa-clock-rotate-left"></i>

                <p>
                    No recent activity yet.
                </p>

                <span>
                    Start learning to see your activity here.
                </span>

            </div>

        `;

        return;

    }


    activityContainer.innerHTML =
        "";


    activities.forEach(activity => {

        const item =
            document.createElement(
                "div"
            );


        item.className =
            "activity-item";


        item.innerHTML = `

            <div class="activity-icon">

                <i class="fa-solid ${activity.icon || "fa-book-open"}"></i>

            </div>

            <div class="activity-content">

                <strong>
                    ${activity.title || "Learning activity"}
                </strong>

                <span>
                    ${activity.subject || ""}
                </span>

            </div>

            <small>
                ${activity.time || ""}
            </small>

        `;


        activityContainer.appendChild(
            item
        );

    });

}


renderRecentActivity();


/* =========================================================
   RESET PROGRESS
========================================================= */

const resetProgressBtn =
    document.getElementById(
        "resetProgress"
    );


if (resetProgressBtn) {

    resetProgressBtn.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to reset all your learning progress?"
                );


            if (!confirmed) {
                return;
            }


            Object.keys(
                dashboardSubjects
            ).forEach(subjectKey => {

                const subject =
                    dashboardSubjects[
                        subjectKey
                    ];


                for (
                    let i = 1;
                    i <= subject.chapters;
                    i++
                ) {

                    localStorage.removeItem(
                        `hsc-progress-${subjectKey}-${i}`
                    );

                }

            });


            localStorage.removeItem(
                "hsc-last-learning"
            );


            localStorage.removeItem(
                DASHBOARD_ACTIVITY_KEY
            );


            location.reload();

        }
    );

}


/* =========================================================
   DASHBOARD REFRESH
========================================================= */

function refreshDashboard() {

    const progress =
        getOverallProgress();


    if (progressValue) {

        progressValue.textContent =
            `${progress}%`;

    }


    if (progressCircle) {

        progressCircle.style.setProperty(
            "--progress",
            `${progress}%`
        );

    }

}


window.addEventListener(
    "storage",
    refreshDashboard
);


/* =========================================================
   DARK MODE
========================================================= */

const dashboardThemeToggle =
    document.getElementById(
        "themeToggle"
    );


const dashboardSavedTheme =
    localStorage.getItem(
        "hsc-theme"
    );


if (
    dashboardSavedTheme === "dark"
) {

    document.body.classList.add(
        "dark-mode"
    );

}


function updateDashboardThemeIcon() {

    if (!dashboardThemeToggle) {
        return;
    }


    const icon =
        dashboardThemeToggle.querySelector(
            "i"
        );


    if (!icon) {
        return;
    }


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    icon.classList.toggle(
        "fa-sun",
        isDark
    );


    icon.classList.toggle(
        "fa-moon",
        !isDark
    );

}


updateDashboardThemeIcon();


if (dashboardThemeToggle) {

    dashboardThemeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "hsc-theme",
                isDark
                    ? "dark"
                    : "light"
            );


            updateDashboardThemeIcon();

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

const dashboardMenuBtn =
    document.getElementById(
        "menuBtn"
    );


const dashboardNavLinks =
    document.getElementById(
        "navLinks"
    );


if (
    dashboardMenuBtn &&
    dashboardNavLinks
) {

    dashboardMenuBtn.addEventListener(
        "click",
        () => {

            dashboardNavLinks.classList.toggle(
                "show"
            );

        }
    );

}


/* =========================================================
   GLOBAL ACCESS
========================================================= */

window.HSCDashboard = {

    getChapterProgress,

    getSubjectProgress,

    getOverallProgress,

    saveLastLearning,

    saveActivity,

    getRecentActivity,

    refreshDashboard

};