 /* =========================================================
    HSC SCIENCE HUB — TEST SYSTEM
    test.js
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
        document.getElementById("submitTest");

    const restartButton =
        document.getElementById("restartTest");

    const resultSection =
        document.getElementById("testResult");

    const scoreElement =
        document.getElementById("testScore");

    const percentageElement =
        document.getElementById("testPercentage");

    const progressBar =
        document.getElementById("testProgress");

    const questionNumber =
        document.getElementById("questionNumber");

    const timerElement =
        document.getElementById("testTimer");



    /* =====================================================
       TEST QUESTIONS
    ===================================================== */

    const questions = [

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
                "Which quantity has both magnitude and direction?",

            options: [
                "Distance",
                "Speed",
                "Vector",
                "Time"
            ],

            answer: 2
        },

        {
            subject: "physics",

            question:
                "Which formula represents speed?",

            options: [
                "v = d / t",
                "F = ma",
                "P = W / t",
                "W = Fs"
            ],

            answer: 0
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
                "Which particle carries a negative charge?",

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
                "Which molecule contains genetic information?",

            options: [
                "Protein",
                "Glucose",
                "DNA",
                "Lipid"
            ],

            answer: 2
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
                "Which language is used to structure web pages?",

            options: [
                "Python",
                "HTML",
                "SQL",
                "C++"
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


    let testQuestions =
        questions;


    if (requestedSubject) {

        const normalizedSubject =
            typeof SUBJECT_ALIASES !== "undefined" &&
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

            testQuestions =
                filtered;

        }

    }



    /* =====================================================
       TEST STATE
    ===================================================== */

    let currentQuestion =
        0;

    let score =
        0;

    let timeLeft =
        10 * 60;

    let timerInterval =
        null;

    const answers =
        new Array(
            testQuestions.length
        ).fill(null);



    /* =====================================================
       UPDATE QUESTION PROGRESS
    ===================================================== */

    function updateProgress() {

        const total =
            testQuestions.length;


        const current =
            currentQuestion + 1;


        if (questionNumber) {

            questionNumber.textContent =
                `${current} / ${total}`;

        }


        if (progressBar) {

            const percent =
                (current / total) * 100;


            progressBar.style.width =
                `${percent}%`;

        }

    }



    /* =====================================================
       RENDER QUESTION
    ===================================================== */

    function renderQuestion() {

        if (
            !questionText ||
            !optionsContainer ||
            testQuestions.length === 0
        ) {

            return;

        }


        const question =
            testQuestions[
                currentQuestion
            ];


        questionText.textContent =
            question.question;


        optionsContainer.innerHTML =
            "";


        question.options.forEach(
            (option, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "test-option";


                button.innerHTML = `

                    <span class="option-letter">
                        ${String.fromCharCode(65 + index)}
                    </span>

                    <span class="option-text">
                        ${option}
                    </span>

                `;


                if (
                    answers[currentQuestion] ===
                    index
                ) {

                    button.classList.add(
                        "selected"
                    );

                }


                button.addEventListener(
                    "click",
                    () => {

                        selectAnswer(
                            index
                        );

                    }
                );


                optionsContainer.appendChild(
                    button
                );

            }
        );


        updateProgress();

        updateNavigation();

    }



    /* =====================================================
       SELECT ANSWER
    ===================================================== */

    function selectAnswer(index) {

        answers[currentQuestion] =
            index;


        const options =
            document.querySelectorAll(
                ".test-option"
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
                testQuestions.length - 1;

        }

    }



    /* =====================================================
       NEXT
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                if (
                    currentQuestion <
                    testQuestions.length - 1
                ) {

                    currentQuestion++;

                    renderQuestion();

                }

            }
        );

    }



    /* =====================================================
       PREVIOUS
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
       TIMER
    ===================================================== */

    function updateTimer() {

        if (!timerElement) return;


        const minutes =
            Math.floor(
                timeLeft / 60
            );


        const seconds =
            timeLeft % 60;


        timerElement.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


        if (timeLeft <= 60) {

            timerElement.classList.add(
                "timer-warning"
            );

        }


        if (timeLeft <= 0) {

            clearInterval(
                timerInterval
            );


            finishTest(
                true
            );

            return;

        }


        timeLeft--;

    }



    function startTimer() {

        if (!timerElement) return;


        updateTimer();


        timerInterval =
            setInterval(
                updateTimer,
                1000
            );

    }



    /* =====================================================
       FINISH TEST
    ===================================================== */

    if (submitButton) {

        submitButton.addEventListener(
            "click",
            () => {

                const confirmed =
                    confirm(
                        "Are you sure you want to submit the test?"
                    );


                if (!confirmed) return;


                finishTest(
                    false
                );

            }
        );

    }



    function finishTest(autoSubmitted = false) {

        if (timerInterval) {

            clearInterval(
                timerInterval
            );

        }


        score = 0;


        testQuestions.forEach(
            (question, index) => {

                if (
                    answers[index] ===
                    question.answer
                ) {

                    score++;

                }

            }
        );


        const total =
            testQuestions.length;


        const percentage =
            Math.round(
                (score / total) * 100
            );


        if (scoreElement) {

            scoreElement.textContent =
                `${score}/${total}`;

        }


        if (percentageElement) {

            percentageElement.textContent =
                `${percentage}%`;

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
                `${
                    autoSubmitted
                        ? "Time is up!\n\n"
                        : ""
                }Your Score: ${score}/${total}\nPercentage: ${percentage}%`
            );

        }


        /* Save result */

        localStorage.setItem(
            "hsc-test-result",
            JSON.stringify({

                score: score,

                total: total,

                percentage: percentage,

                date:
                    new Date().toISOString()

            })
        );

    }



    /* =====================================================
       RESTART TEST
    ===================================================== */

    if (restartButton) {

        restartButton.addEventListener(
            "click",
            () => {

                if (timerInterval) {

                    clearInterval(
                        timerInterval
                    );

                }


                currentQuestion = 0;

                score = 0;

                timeLeft = 10 * 60;


                answers.fill(
                    null
                );


                if (resultSection) {

                    resultSection.classList.remove(
                        "show"
                    );

                }


                if (timerElement) {

                    timerElement.classList.remove(
                        "timer-warning"
                    );

                }


                renderQuestion();

                startTimer();


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

    startTimer();

});