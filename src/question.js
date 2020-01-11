export class Question {
  static create(question) {
    return fetch('https://app-podcast-questions.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        question.id = data.name;
        return question
      })
      .then(addToLocalStorage)
      .then(Question.renderList)
      .catch(error => console.log(error.message))
  }

  static renderList() {
    const all = getLocalStorage();
    const html = all.length
      ? all.map((question, index) => `
        <div class="mui--text-headline">Вопрос (${++index})</div>
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toTimeString()}
         </div>
        <div>${question.text}</div>
        <br>
      `)
      : `<div class="mui--text-headline">Вопросов пока нет</div>`;

    const list = document.getElementById('list');
    list.innerHTML = html;
  }
}

function addToLocalStorage(question) {
  const all = getLocalStorage();
  all.push(question);
  localStorage.setItem('questions', JSON.stringify(all));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('questions')) || [];
}