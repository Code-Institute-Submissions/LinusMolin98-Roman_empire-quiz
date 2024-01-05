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

    document.getElementById('result').innerHTML = "Hello, " + document.getElementById('username').value.trim() + "! You got " + correctAnswers + " out of 3 questions correct!";

    setTimeout(function () {
        hideQuizWindow();
        updateButtonStates();
    }, 100);

}
