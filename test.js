/* eslint-disable */

// name spacing object
const triviaApp = {}
// global variables for API
triviaApp.data = []
triviaApp.dataQuestions = [];
triviaApp.incorrect = [];
triviaApp.correct = [];
// this vairable determines what question the player is currently on
triviaApp.currentQuestion = 0;
// this keeps track of the amount of right questions the player has selected
triviaApp.playerScore = 0;
// users answer choice
triviaApp.userChoice;
// API URL
triviaApp.apiUrl = `https://opentdb.com/api.php`;


// function calls API
triviaApp.getQuestion = () => {
  $.ajax({
    url: triviaApp.apiUrl,
    method:'GET',
    dataType: 'json',
    data: {
      amount: 10,
      category: 14,
      type: 'multiple',
    }
  }).then(array => {
    // pushes all data need into triviaApp.data array
    triviaApp.data.push(array.results)
    // loops through all questions and stores them in a questions array
    for(let i= 0; i < array.results.length; i++) {
      triviaApp.dataQuestions.push(array.results[i].question)
  
      // interates through all questions and makes an takes an array of correct answers
      triviaApp.correct.push(array.results[i].correct_answer)
      
      // interates through all questions and makes an takes an array of incorrect answers to triviaApp.incorrect array
      triviaApp.incorrect.push(array.results[i].incorrect_answers)
    };
    triviaApp.createQuestions(array.results)
    // console.log(triviaApp.incorrect)
    
  }).fail((error) => {
    console.log(error);
  });
};

triviaApp.createQuestions = (hello) => {
  for (let i = 0; i < hello.length; i++){
  $("#question").html(`<h2>${hello[0].question}</h2>`);
  console.log(hello[0].question)
  }
  // console.log(triviaApp.data)
  hello.forEach((e) => {
    // $("#questions").html(`<h2>${questions}</h2>`);
    // console.log(e)
  });
  // let questionObject = triviaApp.dataQuestions;
  // console.log(questionObject)
  // for(let i = 0; i < triviaApp.dataQuestions.length; i++) {
  //   triviaApp.questions = triviaApp.dataQuestions;
  //   console.log(triviaApp.questions[0])
  // }
}


triviaApp.startGame = () => {
  //calls API and populates empty arrays
  triviaApp.getQuestion();
  // populate dom with questions and answers
  triviaApp.createQuestions();
}


$('#answerChoices').on('click', function(){
  triviaApp.currentQuestions++
  triviaApp.createQuestions(triviaApp.data);
})

// this hard reloads page on click
$('#restart').on('click', function () {
  location.reload();
});

// doc ready function
$(function(){
  triviaApp.startGame();

});
