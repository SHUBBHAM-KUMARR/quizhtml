const StartButton = document.getElementById('start-btn')
const NextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex
let quizScore = 0

StartButton.addEventListener('click', startGame)
NextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    StartButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    if (correct) {
        quizScore++
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        NextButton.classList.remove('hide')
    } else {
        StartButton.innerText = 'Restart'
        StartButton.classList.remove('hide')
        alert('Your score is ' + quizScore)
        quizScore = 0
    }
}

function resetState() {
    clearStatusClass(document.body)
    NextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Which one is a JavaScript framework?',
        answers: [
            { text: 'React', correct: true },
            { text: 'django', correct: false },
            { text: 'eclipse', correct: false },
            { text: 'Laravel', correct: false }
        ]
    },
    {
        question: 'Which one is a programming language?',
        answers: [
            { text: 'React', correct: false },
            { text: 'Angular', correct: false },
            { text: 'Vue', correct: false },
            { text: 'Java', correct: true }
        ]
    },
    {
        question: 'Which one is a styling language?',
        answers: [
            { text: 'React', correct: false },
            { text: 'Angular', correct: false },
            { text: 'Vue', correct: false },
            { text: 'CSS', correct: true }
        ]
    },
    {
        question: 'Which one is a database?',
        answers: [
            { text: 'React', correct: false },
            { text: 'Angular', correct: false },
            { text: 'javascript', correct: false },
            { text: 'MongoDB', correct: true }
        ]
    }
]
