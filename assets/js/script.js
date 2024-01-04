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