/* =========================================================
   HSC SCIENCE HUB — SHARED DATA
   data.js
========================================================= */

const HSC_SUBJECTS = {

    physics: {
        name: "Physics",
        icon: "fa-atom",
        description:
            "Build strong concepts in Physics with organized chapters, lectures, notes and practice resources.",
        papers: "1st & 2nd Paper",

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
        icon: "fa-flask",
        description:
            "Understand Chemistry through clear concepts, organized chapters, lectures, notes and regular practice.",
        papers: "1st & 2nd Paper",

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


    mathematics: {
        name: "Higher Mathematics",
        icon: "fa-square-root-variable",
        description:
            "Develop strong mathematical skills through organized chapters, formulas, examples and problem-solving practice.",
        papers: "1st & 2nd Paper",

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
        icon: "fa-dna",
        description:
            "Explore Biology through organized chapters covering cells, genetics, physiology, reproduction and ecology.",
        papers: "1st & 2nd Paper",

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
        icon: "fa-laptop-code",
        description:
            "Learn programming, networking, databases, web design and other important ICT concepts for HSC.",
        papers: "Complete Course",

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
   SUBJECT ALIASES
========================================================= */

const SUBJECT_ALIASES = {
    "higher-math": "mathematics",
    "higher-mathematics": "mathematics",
    "math": "mathematics"
};


/* =========================================================
   GET SUBJECT
========================================================= */

function getHSCSubject(subjectKey) {

    const normalizedKey =
        SUBJECT_ALIASES[subjectKey] || subjectKey;

    return (
        HSC_SUBJECTS[normalizedKey] ||
        HSC_SUBJECTS.physics
    );
}