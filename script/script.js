/* eslint-disable */


let score = 0;
let mainQuestion = 0;
const triviaApp = {};
const totalQuestions = 10;
triviaApp.preppedArray;
triviaApp.data = [];

// triviaApp.question = $('#question').
triviaApp.userChoice = $('#answerChoices')
// triviaApp.results = $('#results');
// triviaApp.restart = $('#restart');
triviaApp.apiUrl = `https://opentdb.com/api.php`;

triviaApp.storeQuestions = [] // empty array to store ajax request into.

triviaApp.nextQuestion = (info) => {
    mainQuestion++;
    // console.log(info)
    triviaApp.createQuestions(info);
    // console.log(mainQuestion);
};

// console.log(triviaApp.storeQuestions)
// get data from the trivia API - ajax request

triviaApp.getQuestions = () => {
    console.log('test');
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
        triviaApp.data.push(result);
        console.log(triviaApp.data)

        triviaApp.storeQuestions.push(triviaArray);
        triviaApp.createQuestions(triviaApp.storeQuestions);
        // console.log(triviaArray)
    }).fail((error) => {
        console.log(error);
    })
}
    
triviaApp.createQuestions = (triviaArray2) => {
    triviaApp.preppedArray = triviaArray2[0].results;
    console.log(triviaApp.preppedArray)
    // const totalQuestions = triviaArray2[i].results.length;
    if (mainQuestion == totalQuestions - 1) {
        $('#results').html('finish');
        console.log('hi')
    };

    if (mainQuestion == totalQuestions) {
        $('#question').hide();
        $('#answerChoices1').hide()
        $('#answerChoices2').hide()
        $('#answerChoices3').hide(
        $('#answerChoices4').hide()
        $('#restart').show()
        $('#gameResults').html(`
        <h1>Congratulations Alan! You got ${score}/10!</h1>
        `);
        console.log('hi, this is the last question.');
    };

    for (let i = 0; i <= triviaApp.preppedArray.length; i++) {
        // console.log(triviaApp.preppedArray[i])
        const questions = triviaApp.preppedArray[i].question;
        const answer1 = triviaApp.preppedArray[i].correct_answer;
        const answer2 = triviaApp.preppedArray[i].incorrect_answers[0];
        const answer3 = triviaApp.preppedArray[i].incorrect_answers[1];
        const answer4 = triviaApp.preppedArray[i].incorrect_answers[2];
        
        
        const triviaEl = `
            <div class="piece">
                <h2>${questions}</h2>
            </div>
            `;
        const triviaA = `<p>${answer1}</p>`
        const triviaB = `<p>${answer2}</p>`
        const triviaC = `<p>${answer3}</p>`
        const triviaD = `<p>${answer4}</p>`
        $('#question').html(triviaEl);
        $('.answerText1').html(triviaA);
        $('.answerText2').html(triviaB);
        $('.answerText3').html(triviaC);
        $('.answerText4').html(triviaD);
    }
}


// $('#answerChoices').on('click', function () {
//     triviaApp.nextQuestion();
// });
// $('#answerChoices2').on('click', function () {
//     triviaApp.nextQuestion();
// });
// $('#answerChoices3').on('click', function () {
//     triviaApp.nextQuestion();
// });
// $('#answerChoices4').on('click', function () {
//     triviaApp.nextQuestion();
// });

// - when user clicks on reset button, mainQuestion == 0, score is empty, and reload screen. 
// - ALAN* when the user clicks restart button, it refreshes the GAME.HTML, not reloads to main title. Idk if thats something we wanted, or if we wanted it to reload to main title page.
$('#restart').on('click', function(){
    mainQuestion = 0;
    score = 0;
    location.reload();
});



$(function () {
    $('#restart').hide();
    triviaApp.getQuestions();

    $('#answerChoices1').on('click', function(){
        // console.log(e)
        const nextQArray = triviaApp.storeQuestions[0].results;
        console.log(nextQArray)
        // console.log(query)
        triviaApp.nextQuestion(nextQArray)
    })
    $('#answerChoices2').on('click', function(triviaArray2){
        console.log('hi alan2')
        // console.log(query)
        triviaApp.nextQuestion(triviaArray2)
    })
    $('#answerChoices3').on('click', function(triviaArray2){
        console.log('hi alan3')
        // console.log(query)
        triviaApp.nextQuestion(triviaArray2)
    });
    $('#answerChoices4').on('click', function(triviaArray2){
        console.log('hi alan4')
        // console.log(query)
        triviaApp.nextQuestion(triviaArray2)
    });
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
