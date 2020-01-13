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

  static fetch(token) {
    if (!token) {
      return Promise.resolve(`<p class="error">у вас нет права доступа</p>`);
    }
    return fetch(`https://app-podcast-questions.firebaseio.com/questions.json?auth=${token}`)
      .then(response => response.json())
      .then(questions => {
        if (questions && questions.error) {
          return `<p class="error">${questions.error}</p>`
        }
        return questions ? Object.keys(questions).map(key => {
          return {
            id: key,
            ...questions[key],
          }
        }) : []
      })
  }

  static listToHtml(questions) {
    return questions.length
      ? `<ol>${questions.map(li => `<li>${li.text}</li>`).join('')}</ol>`
      : `<p>Ууупс...</p>`
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