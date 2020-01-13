import { isValid, createModal } from "./utils";
import { Question } from "./question";
import { authWithEmailAndPassword, getAuthForm} from "./auth";
import './styles.css';

const form = document.getElementById('form');
const input = form.querySelector('#question-text');
const btn = form.querySelector('#btn');
const modalBtn = document.getElementById('modal-btn');

modalBtn.addEventListener('click', openModal);
window.addEventListener('load', () => Question.renderList());
form.addEventListener('submit', submitForm);
input.addEventListener('input', function () {
  btn.disabled = !isValid(input.value);
});

function openModal() {
  createModal('Авторизация', getAuthForm());
  document.getElementById('auth-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const btn = document.getElementById('btnAuth');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    btn.disabled = true;

    authWithEmailAndPassword(email, password)
      .then(Question.fetch)
      .then(renderModalAfterAuth)
      .then(() => btn.disabled = false)
  }, {once: true})
}

function renderModalAfterAuth(content) {
  if (typeof content === 'string') {
    createModal('Отказано в доступе', content)
  } else {
    createModal('Вопросы', Question.listToHtml(content))
  }
}

function submitForm(event) {
  const text = input.value.trim();
  event.preventDefault();
  if (isValid(text))  {
    const question = {
      text,
      date: new Date().toJSON(),
    };
    btn.disabled = true;
    Question.create(question).then(() => {
      input.value = '';
      input.className = '';
      btn.disabled = false;
    });
  }
}