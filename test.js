/* eslint-disable */
let questions = []
let score = 0;
let mainQuestion = 0;
const triviaApp = {};
// triviaApp.question = $('#question').
triviaApp.userChoice = $('#answerChoices')
// triviaApp.results = $('#results');
// triviaApp.restart = $('#restart');
triviaApp.apiUrl = `https://opentdb.com/api.php`;
triviaApp.storeQuestions = [] // empty array to store ajax request into.
triviaApp.nextQuestion = () => {
  mainQuestion++;
  triviaApp.getQuestions();
  // console.log(mainQuestion);
};
// get data from the trivia API - ajax request
triviaApp.getQuestions = () => {
  $.ajax({
    url: triviaApp.apiUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      amount: 10,
      category: 14,
      type: 'multiple',
    }
  })
    .then(result => {
      //   console.log(result.results)
      questions = result.results.map(result => {
        const condensedQuestion = {
          question: result.question
        };
        const answerChoices = [...result.incorrect_answers];
        result.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(result.answer - 1, 0, result.correct_answer);
        answerChoices.forEach((choice, index) => {
          result['choice' + (index + 1)] = choice;
        })
        //   console.log(result)
        triviaApp.showQuestions(result)
        return result;
      })
    })
}
triviaApp.showQuestions = (triviaArray2) => {
  console.log(triviaArray)
}
