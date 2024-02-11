let currentQuestion = 1;
let totalQuestions = 10;
let usernameProvided = false;
let questionOrder = [];

function startQuiz() {
    const username = document.getElementById('username').value.trim();

    if (username === '') {
        alert('Please enter your username before starting the quiz.');
    } else {
        questionOrder = shuffleArray(Array.from({ length: totalQuestions }, (_, i) => i + 1));

        document.getElementById('usernameForm').style.display = 'none';
        document.getElementById('quizContainer').style.display = 'block';
        document.getElementById('instructions').style.display = 'none';
        usernameProvided = true;
        currentQuestion = 1;
        showQuestion(questionOrder[currentQuestion - 1]);
        enableRadioButtons();
    }
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
        const question = document.getElementById('question' + i);
        if (i === questionNumber) {
            question.style.display = 'block';
        } else {
            question.style.display = 'none';
        }
    }

    // Clear previous feedback
    const feedbackElement = document.getElementById('result');
    feedbackElement.textContent = '';
}

function nextQuestion() {
    if (usernameProvided && currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(questionOrder[currentQuestion - 1]);
        updateButtonStates();
    }
}

function previousQuestion() {
    if (usernameProvided && currentQuestion > 1) {
        currentQuestion--;
        showQuestion(questionOrder[currentQuestion - 1]);
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
    const correctAnswersArray = [];
    const incorrectAnswersArray = [];

    for (let i = 1; i <= totalQuestions; i++) {
        const selectedValue = document.querySelector('input[name="q' + i + '"]:checked');
        const isCorrect = selectedValue !== null && selectedValue.value === "a";

        if (isCorrect) {
            correctAnswers++;
            correctAnswersArray.push(i);
        } else {
            incorrectAnswersArray.push(i);
        }
    }

    const username = document.getElementById('username').value.trim();
    const score = correctAnswers;

    localStorage.setItem(username, score);

    retrieveScore();

    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML = "Hello, " + username + "! You got " + score + " out of " + totalQuestions + " questions correct!";

    displayFeedback(correctAnswersArray, incorrectAnswersArray);
}

function displayFeedback(correctAnswers, incorrectAnswers) {
    let feedbackMessage = "You answered the following questions correctly: " + correctAnswers.join(", ");

    if (incorrectAnswers.length > 0) {
        feedbackMessage += "\nYou answered the following questions incorrectly: " + incorrectAnswers.join(", ");
    }

    const feedbackElement = document.getElementById('result');
    feedbackElement.textContent = feedbackMessage;
    feedbackElement.style.display = 'block';
    feedbackElement.style.color = 'black';
}