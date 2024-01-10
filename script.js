const operators = ["+", "-", "*", "/"];
const maxOperand = 20;

function generateRandomQuestion() {
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2;

    if (operator === "+") {
        num1 = Math.floor(Math.random() * 9) + 2;
        num2 = Math.floor(Math.random() * 9) + 2;
    } else if (operator === "-") {
        num1 = Math.floor(Math.random() * 89) + 11;
        num2 = Math.floor(Math.random() * num1) + 1;
    } else if (operator === "*") {
        num1 = Math.floor(Math.random() * 9) + 2;
        num2 = Math.floor(Math.random() * 9) + 2;
    } else if (operator === "/") {
        num2 = Math.floor(Math.random() * 8) + 2;
        num1 = num2 * (Math.floor(Math.random() * 9) + 1);
    }

    const question = `${num1} ${operator} ${num2}`;
    const answer = eval(question);
    return { question: question, answer: answer };
}


const questions = [];

for (let i = 0; i < 10; i++) {
    questions.push(generateRandomQuestion());
}

let currentQuestionIndex = 0;

const questionElement = document.getElementById("question");
const userAnswerInput = document.getElementById("user-answer");
const submitButton = document.getElementById("submit-button");
const resultElement = document.getElementById("result");

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex].question;
        const questionNumber = currentQuestionIndex + 1;
        questionElement.innerHTML = `<p class="question-number">Question ${questionNumber}:</p> ${currentQuestion}`;
        userAnswerInput.value = "";
        resultElement.textContent = "";
    } else {
        questionElement.textContent = "Quiz Completed!";
        userAnswerInput.style.display = "none";
        submitButton.style.display = "none";
        resultElement.textContent = "You Won!";
    }
}



function checkAnswer() {
    const userAnswer = parseFloat(userAnswerInput.value);
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex >= questions.length) {
                displayCongratulations();
            } else {
                displayQuestion();
            }
        }, 1000);
    } else {
        resultElement.textContent = "Incorrect. Try again.";
        setTimeout(() => {
            resetQuiz();
        }, 1000);
    }
}

function displayCongratulations() {
    questionElement.textContent = "Heh noob think you won?";
    userAnswerInput.style.display = "none";
    submitButton.style.display = "none";
    resultElement.textContent = "Message me today's wordle on whatsapp ";
}



function resetQuiz() {
    currentQuestionIndex = 0;
    questions.length = 0;
    for (let i = 0; i < 10; i++) {
        questions.push(generateRandomQuestion());
    }
    displayQuestion();
}



submitButton.addEventListener("click", checkAnswer);

displayQuestion();


userAnswerInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitButton.click();
    }
});


