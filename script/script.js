/* eslint-disable */


let score = 0;
let mainQuestion = 0;
// console.log('it works motha fuckaaa!');

const triviaApp = {};

// triviaApp.question = $('#question');
// triviaApp.choices = $('.answerChoices');
// triviaApp.results = $('#results');
// triviaApp.restart = $('#restart');
triviaApp.apiUrl = `https://opentdb.com/api.php`;

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
  }).then((result)=>{
    const triviaArray = result;
    triviaApp.showQuestions(triviaArray)
  }).fail((error) => {
    // console.log(error);
  })
}


triviaApp.showQuestions = (triviaArray2) => {
    triviaArray2.forEach((...data) => {
    const question = data[0].question;
    const correctAnswer = data[0].correct_answer;
    const incorrectAnswer1 = data[0].incorrect_answers[0];
    const incorrectAnswer2 = data[0].incorrect_answers[1];
    const incorrectAnswer3 = data[0].incorrect_answers[2];
    const triviaEl = `
                <div>
                    <h2>${question}</h2>
                </div>
                `;
    $('#questions').html(triviaEl);
    console.log(data);
    });
};



// triviaApp.getQuestions() {
// }





// - when user clicks on reset button, mainQuestion == 0, score is empty, and reload screen. 
$('#restart').on('click', function(){
    mainQuestion = 0;
    score = 0;
    location.reload();
});



// $(function () {
    
// })