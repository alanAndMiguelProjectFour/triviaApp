/* eslint-disable */

// name spacing object
const triviaApp = {};
// global variables for API
triviaApp.data = [];
triviaApp.questions = [];
triviaApp.incorrect = [];
triviaApp.correct = [];
// this vairable determines what question the player is currently on
triviaApp.questionCounter = 0;
// this keeps track of the amount of right questions the player has selected
triviaApp.playerScore = 0;
// users answer choice
triviaApp.userChoice;
// API URL
triviaApp.apiUrl = `https://opentdb.com/api.php`;

// function calls API
triviaApp.getQuestions = () => {
  $.ajax({
    url: triviaApp.apiUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      amount: 10,
      category: 14,
      type: 'multiple',
    },
  }).then(array => {
    triviaApp.createQuestions = () => {
      // pushes all data need into triviaApp.data array
      triviaApp.data.push(array.results);
      // loops through all questions and stores them in a questions array
      for (let i = 0; i < array.results.length; i++) {
        triviaApp.questions.push(array.results[i].question);
        // interates through all questions and makes an array of correct answers
        triviaApp.correct.push(array.results[i].correct_answer);

        // interates through all questions and makes an takes an array of incorrect answers to triviaApp.incorrect array
        triviaApp.incorrect.push(array.results[i].incorrect_answers);
      }
    };
    // creates questions array, correct answers, and incorrect answers
    triviaApp.createQuestions();
    // this is called here to give time for the get request to be completed or arrays will be empty
    triviaApp.askQuestion();
  });
};

// appends question to question container
triviaApp.askQuestion = () => {
  // use question/answer current question value to itterate through array of questions

  // save the currentQuestion in a variable
  const currentQuestion = triviaApp.questions[triviaApp.questionCounter];
  // save answer in variable
  const currentAnswer = triviaApp.correct[triviaApp.questionCounter];
  // save incorrect questions in variable
  const incorrectAnswersArray = triviaApp.incorrect[triviaApp.questionCounter];

  console.log('QUESTION', currentQuestion, 'ANSWER',currentAnswer, 'WRONG ANSWERS',incorrectAnswersArray);

  //append current question to dom!
  $('.currentQuestion').html(currentQuestion)

  // create a new array of answers with both incorrect and correct answers
  possibleAnswerChoices = incorrectAnswersArray.concat([currentAnswer])
  // shuffles answers
  possibleAnswerChoices.sort()

  console.log('All possible answers!',possibleAnswerChoices);

  // loop through all answers and put them into individual p tags
  for (let i = 1; i <= possibleAnswerChoices.length; i++) {
    // set dataset value to each choice to verify if correct
    $(`#answerOpt-${i}`).attr('data-answer', possibleAnswerChoices[i - 1])
    //append choices to dom
    $(`#answerOpt-${i}`).html(possibleAnswerChoices[i -1])
  }
  // call pick answer
  triviaApp.pickAnswer()

};

// submits answer on user selection
triviaApp.pickAnswer = () => {
  // get a value from players
  $('.possibleAnswers').on('click keypress', function(e) {
    // if else statement will determine if answer is right by comparing data set values if right then playerScore++ if wrong then playerscore is not given anything, else questionCounter++ then call next question in both circumstances!

    
    console.log(this, this.dataset.answer === triviaApp.correct[triviaApp.questionCounter],);
    // $('.possibleAnswer').toggleClass('correct')
    setTimeout(()=> {
      triviaApp.questionCounter++;
      console.log(triviaApp.questionCounter);
      // calls for next
      triviaApp.askQuestion()
    },3000)
  })

}

// nextQuestion will check for correctness, and present next question!




// doc ready function
$(function() {
  triviaApp.getQuestions();
});


// miguel I was able to fix the functionality and make the array load properly so we could use the data! I was also able to append the info to the dom and make the correct answer and incorrect answer a single array then randomize them with.sort then I assigned them data values equaul to the current questiin value! its looking good. the question counter will then iterate trhough all qoustions!! i also made the design a bit cleaner becayse i had to change the names on the html to fit the js info from the array inside. Take a look and let me know what you think - ALAN