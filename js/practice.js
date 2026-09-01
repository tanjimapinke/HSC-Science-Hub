/* =========================================================
   HSC SCIENCE HUB — PRACTICE
   practice.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const questionContainer =
        document.getElementById("questionContainer");

    const questionText =
        document.getElementById("questionText");

    const optionsContainer =
        document.getElementById("optionsContainer");

    const nextButton =
        document.getElementById("nextQuestion");

    const previousButton =
        document.getElementById("previousQuestion");

    const submitButton =
        document.getElementById("submitPractice");

    const scoreElement =
        document.getElementById("practiceScore");

    const progressElement =
        document.getElementById("practiceProgress");

    const questionNumberElement =
        document.getElementById("questionNumber");

    const resultSection =
        document.getElementById("practiceResult");



    /* =====================================================
       PRACTICE QUESTIONS
    ===================================================== */

    const questions = [

        {
            subject: "physics",
            question:
                "Which physical quantity has both magnitude and direction?",
            options: [
                "Speed",
                "Distance",
                "Vector",
                "Time"
            ],
            answer: 2
        },

        {
            subject: "physics",
            question:
                "What is the SI unit of force?",
            options: [
                "Joule",
                "Newton",
                "Watt",
                "Pascal"
            ],
            answer: 1
        },

        {
            subject: "physics",
            question:
                "Which quantity is equal to distance divided by time?",
            options: [
                "Acceleration",
                "Force",
                "Speed",
                "Momentum"
            ],
            answer: 2
        },

        {
            subject: "chemistry",
            question:
                "What is the atomic number of hydrogen?",
            options: [
                "1",
                "2",
                "8",
                "16"
            ],
            answer: 0
        },

        {
            subject: "chemistry",
            question:
                "Which particle has a negative charge?",
            options: [
                "Proton",
                "Neutron",
                "Electron",
                "Nucleus"
            ],
            answer: 2
        },

        {
            subject: "biology",
            question:
                "Which organelle is known as the powerhouse of the cell?",
            options: [
                "Nucleus",
                "Mitochondria",
                "Ribosome",
                "Golgi body"
            ],
            answer: 1
        },

        {
            subject: "biology",
            question:
                "Which molecule carries genetic information?",
            options: [
                "DNA",
                "Glucose",
                "Water",
                "Lipid"
            ],
            answer: 0
        },

        {
            subject: "mathematics",
            question:
                "What is the derivative of x²?",
            options: [
                "x",
                "2x",
                "x²",
                "2"
            ],
            answer: 1
        },

        {
            subject: "mathematics",
            question:
                "What is the value of sin 90°?",
            options: [
                "0",
                "1",
                "-1",
                "1/2"
            ],
            answer: 1
        },

        {
            subject: "ict",
            question:
                "Which language is commonly used to create the structure of web pages?",
            options: [
                "Python",
                "HTML",
                "SQL",
                "C"
            ],
            answer: 1
        }

    ];



    /* =====================================================
       URL SUBJECT FILTER
    ===================================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const requestedSubject =
        params.get("subject");


    let practiceQuestions =
        questions;


    if (requestedSubject) {

        const normalizedSubject =
            SUBJECT_ALIASES &&
            SUBJECT_ALIASES[requestedSubject]
                ? SUBJECT_ALIASES[requestedSubject]
                : requestedSubject;


        const filtered =
            questions.filter(
                question =>
                    question.subject ===
                    normalizedSubject
            );


        if (filtered.length > 0) {

            practiceQuestions =
                filtered;

        }

    }



    /* =====================================================
       STATE
    ===================================================== */

    let currentQuestion =
        0;

    let score =
        0;

    let selectedAnswer =
        null;

    const userAnswers =
        new Array(
            practiceQuestions.length
        ).fill(null);



    /* =====================================================
       UPDATE PROGRESS
    ===================================================== */

    function updateProgress() {

        const total =
            practiceQuestions.length;


        const current =
            currentQuestion + 1;


        if (questionNumberElement) {

            questionNumberElement.textContent =
                `${current} / ${total}`;

        }


        if (progressElement) {

            const percentage =
                (current / total) * 100;

            progressElement.style.width =
                `${percentage}%`;

        }

    }



    /* =====================================================
       RENDER QUESTION
    ===================================================== */

    function renderQuestion() {

        if (
            !questionContainer ||
            practiceQuestions.length === 0
        ) {
            return;
        }


        const question =
            practiceQuestions[
                currentQuestion
            ];


        selectedAnswer =
            userAnswers[
                currentQuestion
            ];


        if (questionText) {

            questionText.textContent =
                question.question;

        }


        if (optionsContainer) {

            optionsContainer.innerHTML =
                "";


            question.options.forEach(
                (option, index) => {

                    const optionButton =
                        document.createElement("button");


                    optionButton.type =
                        "button";


                    optionButton.className =
                        "practice-option";


                    optionButton.innerHTML = `

                        <span class="option-letter">
                            ${String.fromCharCode(65 + index)}
                        </span>

                        <span class="option-text">
                            ${option}
                        </span>

                    `;


                    if (
                        selectedAnswer ===
                        index
                    ) {

                        optionButton.classList.add(
                            "selected"
                        );

                    }


                    optionButton.addEventListener(
                        "click",
                        () => {

                            selectAnswer(
                                index
                            );

                        }
                    );


                    optionsContainer.appendChild(
                        optionButton
                    );

                }
            );

        }


        updateProgress();


        updateNavigation();

    }



    /* =====================================================
       SELECT ANSWER
    ===================================================== */

    function selectAnswer(index) {

        selectedAnswer =
            index;


        userAnswers[
            currentQuestion
        ] =
            index;


        const options =
            document.querySelectorAll(
                ".practice-option"
            );


        options.forEach(
            (option, optionIndex) => {

                option.classList.toggle(
                    "selected",
                    optionIndex === index
                );

            }
        );

    }



    /* =====================================================
       NAVIGATION
    ===================================================== */

    function updateNavigation() {

        if (previousButton) {

            previousButton.disabled =
                currentQuestion === 0;

        }


        if (nextButton) {

            nextButton.disabled =
                currentQuestion ===
                practiceQuestions.length - 1;

        }

    }



    /* =====================================================
       NEXT QUESTION
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                if (
                    currentQuestion <
                    practiceQuestions.length - 1
                ) {

                    currentQuestion++;

                    renderQuestion();

                }

            }
        );

    }



    /* =====================================================
       PREVIOUS QUESTION
    ===================================================== */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                if (
                    currentQuestion > 0
                ) {

                    currentQuestion--;

                    renderQuestion();

                }

            }
        );

    }



    /* =====================================================
       SUBMIT PRACTICE
    ===================================================== */

    if (submitButton) {

        submitButton.addEventListener(
            "click",
            finishPractice
        );

    }



    function finishPractice() {

        score = 0;


        practiceQuestions.forEach(
            (question, index) => {

                if (
                    userAnswers[index] ===
                    question.answer
                ) {

                    score++;

                }

            }
        );


        const percentage =
            Math.round(
                (score /
                    practiceQuestions.length) *
                100
            );


        if (scoreElement) {

            scoreElement.textContent =
                `${score}/${practiceQuestions.length} (${percentage}%)`;

        }


        if (resultSection) {

            resultSection.classList.add(
                "show"
            );


            resultSection.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        } else {

            alert(
                `Practice complete!\n\nScore: ${score}/${practiceQuestions.length}\nPercentage: ${percentage}%`
            );

        }


        /* Save latest result */

        localStorage.setItem(
            "hsc-practice-score",
            JSON.stringify({
                score: score,
                total: practiceQuestions.length,
                percentage: percentage,
                date: new Date().toISOString()
            })
        );

    }



    /* =====================================================
       RETRY PRACTICE
    ===================================================== */

    const retryButton =
        document.getElementById(
            "retryPractice"
        );


    if (retryButton) {

        retryButton.addEventListener(
            "click",
            () => {

                currentQuestion = 0;

                score = 0;

                selectedAnswer = null;


                userAnswers.fill(
                    null
                );


                if (resultSection) {

                    resultSection.classList.remove(
                        "show"
                    );

                }


                renderQuestion();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



    /* =====================================================
       INITIALIZE
    ===================================================== */

    renderQuestion();

});