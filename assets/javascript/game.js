//global variables.
var correct = 0;
var incorrect = 0;
var unAnswered = 0;

$('.questions').hide();
$('.results').hide();

//setting an object array of questions, answers, and the correct answer for the trivia game.
var question = [{
    //q = question, a = answers, c = correct answers 
    q: "What was the name for the first Robin?",
    a: ["Jason Todd", "Damian Wayne", "Dick Grayson", "Time Drake"],
    c: "Dick Grayson",
    id: "Robin",
},
{
    q: "What are Batmans super powers?",
    a: ["Strength", "Speed", "He's Batman", "Flight"],
    c: "He's Batman",
    id: "Batman",
},
{
    q: "Where is Superman from?",
    a: ["Gotham", "Metropolis", "Mogo", "Krypton"],
    c: "Krypton",
    id: "Superman",
},
{
    q: "What is the name of the Green Lantern who is also a planet?",
    a: ["Mogo", "Oa", "Apokolips", "Qward"],
    c: "Mogo",
    id: "GL",
},
{
    q: "Who was the first Flash?",
    a: ["Barry Allen", "Jay Garrick", "Wally West", "Bart Allen"],
    c: "Jay Garrick",
    id: "Flash",

}
]

//have the button on the start screen start the quiz.
$("#start").on("click", function () {
    //starts quiz
    countdown(90);
    $('.start').hide();
    $('.questions').show();
    displayQuestions();

})

//pull the question from an array and display it on the web page.
function displayQuestions() {
    $("#questions").empty();
    // loops through the questions 
    for (var j = 0; j < question.length; j++) {
        $('#questions').append('<div class="' + question[j].id + '"></div>');
        $('.' + question[j].id).append('<div class="question">' + question[j].q + '</div>');
        $('.' + question[j].id).append('<div class="answers' + question[j].id + '"></div>');
        // loops through answers for each radio button
        for (var i = 0; i < question[j].a.length; i++) {
            var inputHTML = '<input type="radio" name="' + question[j].id + '" value="' + question[j].a[i] + '"/><label class="margin--right">' + question[j].a[i] + '</label>'
            $('.answers' + question[j].id).append(inputHTML);
        }
    }
}

//setting the final screen to display what how many question were correct and incorrect.
//Check to see if the selected answer is correct.
$('#submit').on('click', function () {
    // loop through correctArray & radioName to match html elements & answers
    checkAnswers();
    // fade out questions
    $('.questions').fadeOut(500);
    // display correctAnswers
    $('#correctNumbers').append(correct);
    // display wrongAnswers
    $('#wrongNumbers').append(incorrect);
    // show answerScreen
    $('.results').show();
});

function checkAnswers() {
    for (var i = 0; i < question.length; i++) {
        var input = $('input:radio[name="' + question[i].id + '"]:checked');
        if (input.val() === question[i].c) {

            correct++;
        } else {
            incorrect++;
        };
    };
}

//set the time that the user has to answer the question, and display it on the question page.
function countdown(seconds) {
    $("#timer").html(seconds);
    var timer = setInterval(function () {
        seconds = seconds - 1;
        console.log(seconds);
        $("#timer").html(seconds);

        if (seconds <= 0) {
            $('.container').fadeOut(500);

            // loop through correctArray & radioName to match html elements & answers
            checkAnswers();

            $('.questionsResults').prepend("<h3>Times Up!</h3>")
            $('#correctNumbers').append(correct);
            // display wrongAnswers
            $('#wrongNumbers').append(incorrect);
            $('.results').fadeIn(1000).show();

            // alert("Times Up!");
            clearInterval(timer);
            return;
        }
    }, 1000);

    // click event for submit button to stop timer
    $('#submit').on('click', function () {
        clearInterval(timer);
    })
};

//reseting the game with a botton click.
$('#reset').on('click', function () {
    window.location.reload();
});

