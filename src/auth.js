export function getAuthForm() {
  return `
  <form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
      <input type="text" id="email" required>
      <label for="email">email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input type="password" id="password" required>
      <label for="password">password</label>
    </div>
    <button id="btnAuth" type="submit" class="mui-btn mui-btn--raised mui-btn--primary">
      Отправить
    </button>
  </form>`
}

export function authWithEmailAndPassword(email, password) {
  const KEY = 'AIzaSyAjN_lVvkJekjAgemgsHMr5hEPWG95uTpI';
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`, {
    method: 'POST',
    body: JSON.stringify({
      email, password, returnSecureToken: true
    }),
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json())
    .then(data => data.idToken)
}