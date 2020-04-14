$(document).ready(function () {
  const $score = $("#score");
  const $startQuiz = $(".start");
  const $body = $("#body");
  const $time = $("#time");
  const $questions = $(".questions");
  const $answers = $(".answers");
  const $resultScreen = $(".result-screen-container");
  const $result = $(".result-container");

  let totalTime = 100;

  let correct = 0;
  let wrong = 0;
  


  function timerInterval() {
    if (totalTime === 0) {
      endQuestion();
      console.log(quizTime);
      $time.text(totalTime);
    }
    else if (totalTime > 0) {
        $time.text(totalTime--);
        setTimeout(timerInterval, 1000);
    }
  };  
  
  function askQuestion() {

    var questionLength = QUESTIONS.length;
    const quizQuestion = QUESTIONS.shift();
    
    if (questionLength !== 0) {
      var questionTitle = quizQuestion.question;
      console.log(questionLength);
      $questions.html(`<h3>${questionTitle}</h3>`);

      $answers.html("");
      for (var i = 0; i < 4; i++) {
        var answers = quizQuestion.answers[i];
        $answers.append(
          `<input class="choices" type="checkbox" value="${answers}"> ${answers} </input> <br/>`
        );
      }
      var correctAnswer = quizQuestion.correctAnswer;

      var $answerChoice = $(".choices");

      $answerChoice.on("click", (event) => {
        manageAnswerClick(event, correctAnswer);
      });
    } else {
      console.log("end quiz");
      $answers.empty();
      $questions.empty();
      $resultScreen.show();
      endQuestion();
    }
  }

  function manageAnswerClick(event, correctAnswer) {
    const answersChoosen = $(event.target).val();
    var questionLength = QUESTIONS.length;
    if (answersChoosen === correctAnswer) {
      correct++;
      // $result.html("Correct Answers");
      setTimeout(function() {
        $questions.empty();
        if (questionLength !== 0) {
          askQuestion();
          trackScore();

        }
        else {
            quizTime = totalTime;
            endQuestion();
            $time.text(totalTime);
            totalTime = 0;
          
        }
      }, 50);
      

    } else {
      wrong++;
      $result.html("Wrong Answers");
      setTimeout(function() {
        $questions.empty();
        if (questionLength !== 0) {
          askQuestion();
          trackScore();

        }
        else {
            quizTime = totalTime;
            endQuestion();
            $time.text(totalTime);
            totalTime = 0;
        }
      }, 50);
      
    }
  }

  $startQuiz.on("click", function (event) {
    $body.show();
    event.stopPropagation();
    $startQuiz.hide();
    timerInterval();
    askQuestion();
    });

  function endQuestion() {
    $answers.empty();
    $questions.empty();
    $result.show();

  }

  function trackScore() {
    $score.text(correct);
    $score.text(wrong);
    $result.html(`<div id="score"><h4> Correct Answer: ${correct}</h4></div>`);
  }
});
