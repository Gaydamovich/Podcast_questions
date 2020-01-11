import './styles.css';
import { isValid, createModal } from "./utils";
import { Question } from "./question";

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
  createModal('Авторизация', )
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