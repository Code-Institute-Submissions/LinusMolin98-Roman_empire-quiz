let currentQuestion = 1;

function showQuestion(questionNumber) {
    for (let i = 1; i < 3; i++) {
        const question = document.getElementById('question' + i);
        if (i === questionNumber) {
            question.style.display = 'block';
        } else {
            question.style.display = 'none';
        }
    }
}

function nextQuestion () {
    if (currentQuestion < 3) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function previousQuestion () {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function checkAnswers() {
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

   
     document.getElementById('result').innerHTML = "You got " + correctAnswers + " out of 3 questions correct!";
}