export default function toggleNotification(message, index, quantity, mistakes) {
  switch (message) {
    case "CC1":
      showMessage(
        "Вы не ввели текст вопроса. Попробуйте добавить вопрос заново."
      );
      break;
    case "CC2":
      showMessage(
        `Вы не ввели текст ${index} варианта ответа. Попробуйте добавить вопрос заново.`
      );
      break;
    case "CC3":
      showMessage(
        "Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново."
      );
      break;
    case "CC4":
      showMessage(
        "Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения."
      );
      break;
    case "CC5":
      showMessage(`Ваш результат ${index} из ${index}. Вы молодец!`);
      break;
    case "CC6":
      showMessage(
        "Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопрос заново."
      );
      break;
    case "CC7":
      showMessage(
        `Вы неправильно ответили на вопросы:${"\n" + "\n"}${mistakes}${
          "\n" + "\n"
        }Ваш результат ${index - quantity} из ${index}`
      );
      break;
  }
}

export function showMessage(message) {
  alert(message);
}
