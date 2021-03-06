export const container = document.querySelector(".container");
export const addTestButton = document.querySelector(".add-test");
export const startTestButton = document.querySelector(".start-test");
export const initialTestList = [
  {
    question: "Что такое Front-End?",
    options: [
      "Клиентская часть приложения, необходимая для выполнения прямых запросов в базу",
      "Клиентская часть приложения, с которой работает непосредственно пользователь",
      "Набор языков программирования для клиентской части приложения",
      "Клиентская часть приложения, как правило написанная на языке разметки HTML, языке стилей CSS и языке программирования JavaScript",
    ],
    answer: [2, 4],
  },
  {
    question:
      "Какая (какие) из следующих конструкций используется (используются) для ветвления?",
    options: ["for", "do while", "switch case", "if else"],
    answer: [3, 4],
  },
  {
    question:
      "Какая из перечисленных операций имеет больший приоритет (выполняется первой)?",
    options: [
      "Операция “ИЛИ”",
      "Операция “РАВНО”",
      "Операция “HE”",
      "Операция “И”",
    ],
    answer: [3],
  },
  {
    question: "Выберите тип алгоритма, которого не существует",
    options: [
      "Алгоритм с ветвлением",
      "Циклический с постусловием",
      "Циклический с параметром",
      "Циклический безусловный",
    ],
    answer: [4],
  },
  {
    question: "Что из нижеперечисленного не является алгоритмом?",
    options: [
      "Рецепт приготовления блюда",
      "Список продуктов",
      "Список действий при пожаре",
      "План эвакуации",
    ],
    answer: [2],
  },
];
export let userAnswers = [];
export let checkedAnswers = [];
