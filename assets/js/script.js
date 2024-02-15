let currentQuestion = 1;
let totalQuestions = 10;
let usernameProvided = false;
let questionOrder = shuffleArray(Array.from({ length: totalQuestions }, (_, i) => i + 1));

document.getElementById('restartButton').style.display = 'none'; // Initially hide the restart button
document.getElementById('submitButton').style.display = 'none'; // Initially hide the submit button

function startQuiz() {
    const username = document.getElementById('username').value.trim();
    if (username === '') {
        alert('Please enter your username before starting the quiz.');
        return;
    }

    questionOrder = shuffleArray(Array.from({ length: totalQuestions }, (_, i) => i + 1));
    document.getElementById('usernameForm').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('instructions').style.display = 'none';
    usernameProvided = true;
    showQuestion(questionOrder[currentQuestion - 1]);
    enableRadioButtons();
    updateButtonStates();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showQuestion(questionNumber) {
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById('question' + i).style.display = 'none';
    }
    document.getElementById('question' + questionNumber).style.display = 'block';
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(questionOrder[currentQuestion - 1]);
        updateButtonStates();
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(questionOrder[currentQuestion - 1]);
        updateButtonStates();
    }
}

function enableRadioButtons() {
    document.querySelectorAll('input[type="radio"]').forEach(button => button.disabled = false);
}

function updateButtonStates() {
    document.getElementById('nextButton').style.display = currentQuestion < totalQuestions ? 'inline' : 'none';
    document.getElementById('prevButton').style.display = currentQuestion > 1 ? 'inline' : 'none';
    document.getElementById('submitButton').style.display = currentQuestion === totalQuestions ? 'inline' : 'none';
}

function checkAnswers() {
    let correctAnswers = 0;
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        const correctOption = "a"; // Assuming 'a' is the correct answer for simplicity

        if (selectedOption && selectedOption.value === correctOption) {
            correctAnswers++;
        }
    }

    const username = document.getElementById('username').value.trim();
    window.location.href = `results.html?username=${encodeURIComponent(username)}&score=${correctAnswers}&total=${totalQuestions}`;
}

// Helper function to reset the quiz if needed
function resetQuiz() {
    currentQuestion = 1;
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('usernameForm').style.display = 'block';
    document.getElementById('instructions').style.display = 'block';
    document.querySelectorAll('input[type="radio"]').forEach(button => {
        button.checked = false;
        button.disabled = true;
    });
    document.getElementById('restartButton').style.display = 'none';
    usernameProvided = false;
    updateButtonStates();
}