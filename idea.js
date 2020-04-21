/* eslint-disable */

// name spacing object
const triviaApp = {}
// global variables for API
triviaApp.data = [];
triviaApp.questions = [];
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
    method: 'GET',
    dataType: 'json',
    data: {
      amount: 10,
      category: 14,
      type: 'multiple',
    }
  }).then(result => {
    triviaApp.showQuestions(result.results);
  })
};

triviaApp.showQuestions = (data) => {
  triviaApp.questions.push(data)

  triviaApp.appendQuestion()
}

triviaApp.appendQuestion = () => {
  console.log();
  $('#question').html(
    `
    <h2>${triviaApp.questions[0][1].question}</h2>  
    `
  )
}









// this hard reloads page on click
$('#restart').on('click', function () {
  location.reload();
});

// doc ready function
$(function () {
  triviaApp.getQuestion()
});