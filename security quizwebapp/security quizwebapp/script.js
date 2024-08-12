(function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const timerElement = document.getElementById('timer');

    const quizQuestions = [
        {
            question: "What does SQL stand for?",
            answers: {
                a: "Structured Query Language",
                b: "Standard Query Language",
                c: "Simple Query Language",
                d: "Structured Question Language"
            },
            correctAnswer: "a"
        },
        {
            question: "What is phishing?",
            answers: {
                a: "A method of fishing",
                b: "A way to trick users into revealing personal information",
                c: "A type of computer virus",
                d: "A way to protect data"
            },
            correctAnswer: "b"
        },
        {
            question: "What is a firewall?",
            answers: {
                a: "A physical wall to prevent fires",
                b: "A network security system",
                c: "A type of malware",
                d: "A software update"
            },
            correctAnswer: "b"
        },
        {
            question: "What does HTTPS stand for?",
            answers: {
                a: "HyperText Transfer Protocol Secure",
                b: "HyperText Transfer Protocol Simple",
                c: "Hyper Transfer Text Secure",
                d: "Hyper Transfer Text System"
            },
            correctAnswer: "a"
        },
        {
            question: "What is malware?",
            answers: {
                a: "Software designed to protect your computer",
                b: "Software that is harmful to your computer",
                c: "An email scam",
                d: "A type of network"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the primary purpose of encryption?",
            answers: {
                a: "To compress data",
                b: "To protect data",
                c: "To transfer data",
                d: "To delete data"
            },
            correctAnswer: "b"
        },
        {
            question: "What does VPN stand for?",
            answers: {
                a: "Virtual Private Network",
                b: "Virtual Public Network",
                c: "Visual Private Network",
                d: "Visual Public Network"
            },
            correctAnswer: "a"
        },
        {
            question: "What is a DDoS attack?",
            answers: {
                a: "Distributed Denial of Service",
                b: "Distributed Data of Service",
                c: "Direct Denial of Service",
                d: "Direct Data of Service"
            },
            correctAnswer: "a"
        },
        {
            question: "What is the purpose of two-factor authentication?",
            answers: {
                a: "To provide two passwords",
                b: "To confirm the user's identity with two methods",
                c: "To make logging in twice as fast",
                d: "To prevent phishing attacks"
            },
            correctAnswer: "b"
        },
        {
            question: "What is ransomware?",
            answers: {
                a: "Software that locks your data until a ransom is paid",
                b: "Software that protects your data",
                c: "An email scam",
                d: "A type of firewall"
            },
            correctAnswer: "a"
        }
    ];

    let timer;
    let timeLeft = 300; // 5 minutes in seconds

    function buildQuiz() {
        const output = [];

        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            for (let letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} : ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>`
            );
        });

        quizContainer.innerHTML = output.join('');
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                submitButton.click();
            }
        }, 1000);
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');

        let numCorrect = 0;

        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].classList.add('correct');
                answerContainers[questionNumber].classList.remove('incorrect');
            } else {
                answerContainers[questionNumber].classList.add('incorrect');
                answerContainers[questionNumber].classList.remove('correct');
            }
        });

        resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
    }

    buildQuiz();
    startTimer();

    submitButton.addEventListener('click', showResults);
})();
