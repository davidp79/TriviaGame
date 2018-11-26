var triviaQuestions = [{
    question: "In what year did Bruce Lee die?",
    answerList: ["1979", "1973", "1995", "2000"],
    answer: 1
}, {
    question: "Which is the biggest grossing movie of all time?",
    answerList: ["Gone With the Wind", "Terminator", "Nightmare on Elm Street", "Titanic"],
    answer: 0
}, {
    question: "What was the first animated movie?",
    answerList: ["Snow White and the Seven Dwarves", "A Bug's Life", "Monster's Inc", "Finding Nemo"],
    answer: 0
}, {
    question: "When was Bugs Bunny first released?",
    answerList: ["1956", "1960", "1940", "1935"],
    answer: 2
}, {
    question: "When was Starwars first released?",
    answerList: ["1985", "1970", "1980", "1977"],
    answer: 3
}, {
    question: "Who is the highest grossing actor of all time?",
    answerList: ["Samuel L. Jackson", "Mark Hamill", "Brad Pitt", "Chuck Norris"],
    answer: 0
}, {
    question: "Who stars in the DieHard films?",
    answerList: ["Tommy Chong", "Bruce Willis", "Sylvester Stallone", "John Lasseter"],
    answer: 1
}, {
    question: "Who directed the Titanic?",
    answerList: ["Peter Docter", "Brad Bird", "James Cameron", "Peter Sohn"],
    answer: 2
}, {
    question: "When was Willow released?",
    answerList: ["1991", "1988", "1980", "1995"],
    answer: 1
}, {
    question: "Who Starred in Quigley Down Under?",
    answerList: ["Mel Gibson", "Woody Harrelson", "John Wayne", "Tom Selleck"],
    answer: 3
}, {
    question: "Who was the voice of Shrek?",
    answerList: ["Michael Myers", "John Stamos", "Hugh Hefner", "Idris Elba"],
    answer: 0
}, {
    question: "Who directed The Shining?",
    answerList: ["Stephen King", "Stanley Kubrick", "Michael Bay", "JJ Abrams"],
    answer: 1
}, {
    question: "Who starred in Iron Man?",
    answerList: ["Josh Duhamel", "Sean Patrick Flannery", "Willem dafoe", "Robert Downey Jr"],
    answer: 3
}, {
    question: "What is the greatest movie of all time?",
    answerList: ["Powder", "Journey to the Center of the Earth", "Dumb and Dumber", "Singing in the Rain"],
    answer: 0
}, {
    question: "Who directed the original Starwars?",
    answerList: ["Stephen Spielburg", "Quentin Tarantino", "George Lucas", "Peter Jackson"],
    answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13', 'question14', 'question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
    correct: "Yes, that's right!",
    incorrect: "No, that's not it.",
    endTime: "Out of time!",
    finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    answered = true;

    //sets up new questions & answerList
    $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({ 'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    //checks to see correct, incorrect, or unanswered
    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 5000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}