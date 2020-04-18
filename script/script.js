/* eslint-disable */


let score = 0;
let mainQuestion = 0;
const triviaApp = {};

// triviaApp.question = $('#question').
triviaApp.userChoice = $('#answerChoices')
// triviaApp.results = $('#results');
// triviaApp.restart = $('#restart');
triviaApp.apiUrl = `https://opentdb.com/api.php`;


triviaApp.nextQuestion = () => {
    mainQuestion++;
    triviaApp.getQuestions();
    console.log(mainQuestion);
};

// get data from the trivia API - ajax request

triviaApp.getQuestions = () => {
  $.ajax ({
      url: triviaApp.apiUrl,
      method: 'GET',
      dataType: 'json',
      data: {
        amount: 10,
        category: 14,
        type: 'multiple',
      }
  })
  .then((result)=> {
    const triviaArray = result;
    triviaApp.showQuestions(triviaArray)
    // console.log(triviaArray.results[0])
    return result;
  }).fail((error) => {
    console.log(error);
  })
}
triviaApp.showQuestions = (triviaArray2) => {

    if (mainQuestion == triviaArray2.results.length - 1) {
        $('#results').html('finish');
        console.log('hi')
    };


    if (mainQuestion == triviaArray2.results.length) {
        $('#question').hide();
        $('#answerChoices1').hide()
        $('#answerChoices2').hide()
        $('#answerChoices3').hide()
        $('#answerChoices4').hide()
        $('#restart').show()
        $('#information').html(`
            <h1>Congratulations Alan! You got ${score}/10!</h1>
        `);
        console.log('hi, this is the last question.');
    };

    const question = triviaArray2.results[0].question;
    const correctAnswer = triviaArray2.results[0].correct_answer;
    const incorrectAnswer1 = triviaArray2.results[0].incorrect_answers[0];
    const incorrectAnswer2 = triviaArray2.results[0].incorrect_answers[1];
    const incorrectAnswer3 = triviaArray2.results[0].incorrect_answers[2];
    const newArray = [
        answer1 = correctAnswer,
        answer2 = incorrectAnswer1,
        answer3 = incorrectAnswer2,
        answer4 = incorrectAnswer3,
    ]


    // ALAN return 
    // triviaApp.shuffleChoices = function (arr) {
    //     for (let i = arr.length - 1; 1 > 0; i--)
    // }

    const triviaEl = `
                <div class="piece">
                    <h2>${question}</h2>
                </div>
                `;
    const triviaA = `<p>${correctAnswer}</p>`
    const triviaB = `<p>${incorrectAnswer1}</p>`
    const triviaC = `<p>${incorrectAnswer2}</p>`
    const triviaD = `<p>${incorrectAnswer3}</p>`
    $('#question').html(triviaEl);
    $('.answerText1').html(triviaA);
    $('.answerText2').html(triviaB);
    $('.answerText3').html(triviaC);
    $('.answerText4').html(triviaD);
    // console.log(triviaArray2.results);
};

    // console.log(newArray)
$('#answerChoices1').on('click', function () {
    triviaApp.nextQuestion();
});
$('#answerChoices2').on('click', function () {
    triviaApp.nextQuestion();
});
$('#answerChoices3').on('click', function () {
    triviaApp.nextQuestion();
});
$('#answerChoices4').on('click', function () {
    triviaApp.nextQuestion();
});


// - when user clicks on reset button, mainQuestion == 0, score is empty, and reload screen. 
// - ALAN* when the user clicks restart button, it refreshes the GAME.HTML, not reloads to main title. Idk if thats something we wanted, or if we wanted it to reload to main title page.
$('#restart').on('click', function(){
    mainQuestion = 0;
    score = 0;
    location.reload();
});



$(function () {
    $('#restart').hide();
    triviaApp.getQuestions()
})



// MIGUEL - using the $.when, causes too much recursion. 
// const triviaBag = [];
// for (i = 1; i <= 2; i++) {
//     triviaBag.push(triviaApp.getQuestions(i));
// }
// $.when(...triviaBag)
//     .then((...fulfilledTrivia) => {
//         const whatWeNeed = fulfilledTrivia.map((miniArray) => {
//             return miniArray;
//         });
//         console.log(whatWeNeed)
//         // whatWeNeed.forEach((questions) => {
//         //     console.log(questions);
//         // })
//         // triviaApp.showQuestions(triviaArray)
//     }).fail((error) => {
//         console.log(error);
//     })
// }