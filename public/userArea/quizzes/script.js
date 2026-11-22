const cardStart = document.querySelector("#quizStart");
const cardQuestions = document.querySelector("#quizQuestions");
let quizData = null;
let indexQuestion = 0;
let userAnswers = [];

function showQuiz() {
  const quizTitle = document.querySelector("#quizTitle");
  const quizDescription = document.querySelector("#quizDescription");

  fetch("/quiz/questions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      quizData = data;
      quizTitle.innerHTML = `<i class="ph ph-fingerprint-simple"></i> ${quizData.title}`;
      quizDescription.innerHTML = quizData.quiz_description;
    })
    .catch((error) => {
      alertMessage("error", error);
    });
}
showQuiz();

function startQuiz() {
  cardQuestions.style.display = "flex";
  cardStart.style.display = "none";
  showQuestions();
}

function showQuestions() {
  const numQuestion = document.querySelector("#numQuesiton");
  const question = document.querySelector("#currentQuestion");
  const alternatives = document.querySelector("#alternatives");

  question.innerHTML = quizData.questions[indexQuestion].question_text;
  numQuestion.innerHTML = `${indexQuestion + 1}.`;

  const currentQuestion = quizData.questions[indexQuestion];
  const savedAnswer = userAnswers[indexQuestion]
    ? userAnswers[indexQuestion].option_id
    : null;

  let options = "";

  for (let i = 0; i < currentQuestion.answer_options.length; i++) {
    const option = currentQuestion.answer_options[i];
    const checked = savedAnswer === option.id ? "checked" : "";

    options += `
      <label class="alternativeItem">
        <input type="radio" name="alternative" class="quizAlternatives" value="${option.id}" ${checked}/>
        ${option.option_text}
      </label>
    `;
  }
  alternatives.innerHTML = options;
}

function closeQuestion() {
  cardQuestions.style.display = "none";
  cardStart.style.display = "flex";
  indexQuestion = 0;
}

function nextQuestion() {
  if (!saveAnswer()) return alertMessage("error", "Selecione uma alternativa");

  if (indexQuestion === quizData.questions.length - 1) {
    showResult();
  } else {
    indexQuestion++;
    showQuestions();
  }
}

function previousQuestion() {
  if (indexQuestion > 0) {
    indexQuestion--;
    showQuestions();
  }
}

function saveAnswer() {
  const selectedOption = document.querySelector(
    'input[name="alternative"]:checked',
  );

  if (selectedOption === null) return false;

  userAnswers[indexQuestion] = {
    question_id: quizData.questions[indexQuestion].id,
    option_id: Number(selectedOption.value),
  };

  return true;
}

async function showResult() {
  const cardResult = document.querySelector("#quizResult");
  const cardQuestions = document.querySelector("#quizQuestions");
  const profilePrimary = document.querySelector("#profilePrimary");
  const descriptionPrimary = document.querySelector("#descriptionPrimary");
  const titleSecondary = document.querySelector("#titleSecondary");
  const profileSecondary = document.querySelector("#profileSecondary");
  const descriptionSecondary = document.querySelector("#descriptionSecondary");

  cardResult.style.display = "flex";
  cardQuestions.style.display = "none";

  const userId = sessionStorage.getItem("ID_USER");

  try {
    const resAttmept = await fetch("/quiz/register-attempt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        quiz_id: quizData.id,
      }),
    });

    if (!resAttmept.ok) 
      return resAttmept.json().then(json => {
        alertMessage("error", json)}
      );
    const { attemptId } = await resAttmept.json();

    const resAnswers = await fetch("/quiz/register-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attemptId: attemptId,
        answers: userAnswers,
      }),
    });

    if (!resAnswers.ok) 
        return resAnswers.json().then(json => {
        alertMessage("error", json)}
      );

    const resResult = await fetch("/quiz/result-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        attempt_id: attemptId,
      }),
    });

    if (!resResult.ok) 
      return resResult.json().then(json => {
        alertMessage("error", json)}
      );
    const profiles = await resResult.json();

    profilePrimary.innerHTML = profiles[0].profile_name;
    descriptionPrimary.innerHTML = profiles[0].description;

    if (profiles[1]) {
      titleSecondary.innerHTML = "Perfil criativo secundário é:";
      profileSecondary.innerHTML = profiles[1].profile_name;
      descriptionSecondary.innerHTML = profiles[1].description;
    }
  } catch (error) {
    console.log(error);
    alertMessage("error", error.message);
  }
}
