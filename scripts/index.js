import {
  container,
  addTestButton,
  startTestButton,
  initialTestList,
  userAnswers,
  checkedAnswers,
} from "./constants.js";
import toggleNotification from "./notification.js";

function startTest() {
  disableButtons();
  showTestsList(initialTestList);
  createButton();
}

function disableButtons() {
  addTestButton.disabled = true;
  startTestButton.disabled = true;
}

function showTestsList(list) {
  list.forEach((item) => {
    createTest(item);
  });
}

function createTest(element) {
  createQuestion(element.question);
  element.options.forEach((option) => {
    createOption(option);
  });
}

function addQuestion() {
  let question = prompt("Введите текст вопроса:");
  if (!question && question !== " ") {
    toggleNotification("CC1");
  }
  return question;
}

function addOption() {
  let optionsList = [];
  for (let i = 1; i < 5; i++) {
    let label = prompt(`Введите текст ${i} варианта ответа`, "");
    if (!label) {
      toggleNotification("CC2", [i]);
      break;
    }
    optionsList.push(label);
  }
  return optionsList;
}

function addAnswer() {
  let answer = prompt(
    "Введите номера правильных ответов через запятую. Нумерация начинается с 1"
  );
  let isValid = isValidValue(answer);
  let arrayOfNumbers = answer.split(",").map((i) => Number(i));
  let isRepeat = isRepeatedNumber(arrayOfNumbers);

  if (!answer) {
    toggleNotification("CC3");
  } else if (!isValid || isRepeat) {
    toggleNotification("CC6");
  } else {
    return arrayOfNumbers;
  }
}

function addTestToTheList() {
  let obj = {};
  obj.question = addQuestion();
  if (obj.question) {
    obj.options = addOption();
    if (obj.options.length === 4) {
      obj.answer = addAnswer();
      if (obj.answer && obj.answer != "") {
        initialTestList.push(obj);
      }
    }
  }
}

function isRepeatedNumber(array) {
  return new Set(array).size !== array.length;
}

function isValidValue(str) {
  const regExp = /^((([1-4])(\,|$)){1,4})$/gm;
  let isValid = regExp.test(str);
  return isValid;
}

function createQuestion(name) {
  let question = document.createElement("li");
  question.textContent = name;
  question.style.fontWeight = "bold";
  container.append(question);
}

function createOption(option) {
  let checkbox = createCheckbox();
  let label = createLabel(option);
  let br = document.createElement("br");
  container.append(checkbox, label, br);
}

function createCheckbox() {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = changeCheckboxStatus;
  return checkbox;
}

function createLabel(name) {
  let label = document.createElement("label");
  label.textContent = name;
  return label;
}

function createButton() {
  let button = document.createElement("button");
  let buttonText = document.createTextNode("Отправить");
  button.appendChild(buttonText);
  button.onclick = getCheckedCheckboxes;
  container.append(button);
}

function changeCheckboxStatus(evt) {
  let checkbox = evt.target;
  let isChecked = checkbox.checked;
  if (isChecked) {
    return true;
  } else {
    return false;
  }
}

function getCheckedCheckboxes() {
  const inputs = document.getElementsByTagName("input");
  let inputsList = Array.from(inputs);
  const numberOfInputsInEachTest = 4;
  const slicedArray = [];
  for (let i = 0; i < inputsList.length; i += numberOfInputsInEachTest) {
    slicedArray.push(inputsList.slice(i, i + numberOfInputsInEachTest));
  }
  for (let i = 0; i < slicedArray.length; i++) {
    userAnswers.push([]);
    for (let j = 0; j < slicedArray[i].length; j++) {
      if (slicedArray[i][j].checked) {
        userAnswers[i].push(j + 1);
      }
    }
  }
  checkAnswer();
}

function checkAnswer() {
  for (let i = 0; i < initialTestList.length; i++) {
    if (!userAnswers[i].length) {
      toggleNotification("CC4");
      resetUserAnswers();
      return;
    }
    let v =
      JSON.stringify(initialTestList[i].answer.sort()) ==
      JSON.stringify(userAnswers[i].sort());
    if (!v) {
      checkedAnswers.push([i + 1] + ". " + initialTestList[i].question);
    }
  }
  if (checkedAnswers.length) {
    let mistakesList = checkedAnswers
      .toString()
      .split(",")
      .join("\n")
      .toString();
    toggleNotification(
      "CC7",
      initialTestList.length,
      checkedAnswers.length,
      mistakesList
    );
    resetUserAnswers();
  } else {
    toggleNotification("CC5", initialTestList.length);
    resetUserAnswers();
  }
}

function resetUserAnswers() {
  userAnswers.length = 0;
  checkedAnswers.length = 0;
}

addTestButton.addEventListener("click", addTestToTheList);
startTestButton.addEventListener("click", startTest);
