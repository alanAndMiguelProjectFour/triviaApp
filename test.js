// name spacing object
const triviaApp = {};

// global variables for APIs
triviaApp.data = [];
triviaApp.questions = [];
triviaApp.incorrect = [];
triviaApp.correct = [];
// local array of objects

// array of player result pictures
triviaApp.gifs = [
  {
    // 3 or less this gif displays
    gif: "./assets/bad.gif",
    alt: "man at baseball game pointing his thumb down in disappointment."
  },

  {
    // 6 or less this gif displays
    gif: "./assets/mediocre.gif",
    alt: "John Mulaney telling you this is mediocre"
  },

  {
    // 9 or less this gif displays
    gif: "./assets/good.gif",
    alt: "Chris Pratt showing excitement to the camera"
  },
  
  {
    // get all right this gif displays
    gif: "./assets/perfect.gif",
    alt: "Chris Pratt showing excitement to the camera"
  },
]

// this variable determines what question the player is currently on
triviaApp.questionCounter = 0;
triviaApp.lastQuestion = 10;

// this keeps track of the amount of right questions the player has selected
triviaApp.playerScore = 0;

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
      // pushes all data needed into triviaApp.data array
      triviaApp.data.push(array.results);
      // loops through all questions and stores them in a questions array
      for (let i = 0; i < array.results.length; i++) {
        triviaApp.questions.push(array.results[i].question);
        // interates through all questions and makes an array of correct answers
        triviaApp.correct.push(array.results[i].correct_answer);
        // interates through all questions and makes array of incorrect answers to triviaApp.incorrect array
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
  if (triviaApp.questionCounter == triviaApp.lastQuestion) {
    triviaApp.gameOver();
  }

  // use question/answer current question value to itterate through array of questions

  // save the currentQuestion in a variable
  const currentQuestion = triviaApp.questions[triviaApp.questionCounter];
  // save answer in variable
  const currentAnswer = triviaApp.correct[triviaApp.questionCounter];
  // save incorrect questions in variable
  const incorrectAnswersArray = triviaApp.incorrect[triviaApp.questionCounter];

  //append current question to dom!
  $('.currentQuestion').html(currentQuestion)

  // create a new array of answers with both incorrect and correct answers
  possibleAnswerChoices = incorrectAnswersArray.concat([currentAnswer])

  // shuffles answers
  possibleAnswerChoices.sort()

  // loop through all answer choices and put them into individual p tags
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
    
    // immediately turns off event handler to prevent over clicking of answers/ in which makes questions counter skip questions
    $('.possibleAnswers').unbind('click keypress')
   
    // if else statement will determine if answer is right by comparing data set values if right then playerScore++ and background changes to green, if wrong background changes to red. 
    if (this.dataset.answer === triviaApp.correct[triviaApp.questionCounter] ) {
      $('.questionContainer').toggleClass('correct');
      // add to player score if correct.
      triviaApp.playerScore++;     
    } else {
      $('.questionContainer').toggleClass('incorrect');
    }

    // set timeout to prevent question from changing immediatly and not showing correct/incorrect background colour change.
    setTimeout(()=> {
      // adds + 1 to questions counter to itterate through questions
      triviaApp.questionCounter++;
      // toggles classes background back to normal
      $('.questionContainer').removeClass('incorrect')
      $('.questionContainer').removeClass('correct')
      // calls for next
      triviaApp.askQuestion()
    },500);
  });

}

// game over function shows results and presents retry button
triviaApp.gameOver = () => {
  // page slides up and hide on last player choice
  $('.game').slideUp(1000);
  // show results page
  $('.playerResults').toggleClass('hide');
  
  //set variables to each object for results img
  const threeOrLess = triviaApp.gifs[0];
  const sixOrLess = triviaApp.gifs[1];
  const nineOrLess = triviaApp.gifs[2];
  const perfect = triviaApp.gifs[3];

  //appends results page to DOM
  $('.playerResults').html(
    `
    <div class="resultContainer">
      <img class="resultPic" src="" alt="">
      <h2><span>Congrats!</span> You got ${triviaApp.playerScore}/10!</h2>
      <a href="index.html" class="btn">Try Again?</a>
    </div>
    `
    )
  
    // if else statement shows appropriate images for player results
    if (triviaApp.playerScore <= 3) {
      $('.resultPic').attr('src', threeOrLess.gif)
      $('.resultPic').attr('alt', threeOrLess.alt)
    } else if (triviaApp.playerScore <= 6) {
      $('.resultPic').attr('src', sixOrLess.gif)
      $('.resultPic').attr('alt', sixOrLess.alt)
    } else if (triviaApp.playerScore <= 9) {
      $('.resultPic').attr('src', nineOrLess.gif)
      $('.resultPic').attr('alt', nineOrLess.alt)
    } else {
        $('.resultPic').attr('src', perfect.gif)
        $('.resultPic').attr('alt', perfect.alt)
    } 
} 
  

// doc ready function
$(function() {
  triviaApp.getQuestions();
});
