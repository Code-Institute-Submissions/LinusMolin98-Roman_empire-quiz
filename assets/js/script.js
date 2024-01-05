let currentQuestion = 1;
let totalQuestions = 3;
let usernameProvided = false;

function startQuiz() {
    const username = document.getElementById('username').value.trim();

    if (username === '') {
        alert('Please enter your username before starting the quiz.');
    } else {
        document.getElementById('usernameForm').style.display = 'none';
        document.getElementById('quizContainer').style.display = 'block';
        usernameProvided = true;
        showQuestion(currentQuestion);
        enableRadioButtons();
    }
}

function showQuestion(questionNumber) {
    for (let i = 1; i <= 3; i++) {
        const question = document.getElementById('question' + i);
        if (i === questionNumber) {
            question.style.display = 'block';
        } else {
            question.style.display = 'none';
        }
    }
}

function nextQuestion() {
    if (usernameProvided && currentQuestion < 3) {
        currentQuestion++;
        showQuestion(currentQuestion);
        updateButtonStates();
    }
}

function previousQuestion() {
    if (usernameProvided && currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
        updateButtonStates(); 
    }
}

function enableRadioButtons() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => {
        button.disabled = false;
    });
}

function hideQuizWindow() {
    document.getElementById('quizContainer').style.display = 'none';
}

function updateButtonStates() {
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');

nextButton.disabled = currentQuestion === totalQuestions;
prevButton.disabled = currentQuestion === 1;
}

function retrieveScore() {
    const username = document.getElementById('username').value.trim();
    const storedScore = localStorage.getItem(username);

    if (storedScore !== null) {
        const scoreElement = document.getElementById('score');
        scoreElement.innerHTML = "Hello again, " + username + "! Your previous score was " + storedScore + " out of 3.";
    }
}


function checkAnswers() {
    if (!usernameProvided) {
        alert('Please enter your username before submitting the quiz.');
        return;
    }

    let correctAnswers = 0;

    if (document.querySelector('input[name="q1"]:checked').value === "a") {
        correctAnswers++;
    }

    if (document.querySelector('input[name="q2"]:checked').value === "a") {
        correctAnswers++;
    }

    if (document.querySelector('input[name="q3"]:checked').value === "b") {
        correctAnswers++;
    }

    const username = document.getElementById('username').value.trim();
    const score = correctAnswers;

    localStorage.setItem(username, score);

    
    retrieveScore();

    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML = "Hello, " + username + "! You got " + score + " out of 3 questions correct!";

    setTimeout(function () {
        hideQuizWindow();
        updateButtonStates();
    }, 100);
}
