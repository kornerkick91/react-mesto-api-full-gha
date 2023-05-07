import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formValue.email, formValue.password);
  }

  return (
    <form onSubmit={handleSubmit} className="form-auth">
      <h2 className="form-auth__heading">Вход</h2>
      <input
        className="form-auth__input"
        id="user-email-input"
        name="email"
        value={formValue.email || ''}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        minLength="2"
        maxLength="40"
        required
      />
      <input
        className="form-auth__input"
        id="user-password-input"
        name="password"
        value={formValue.password || ''}
        onChange={handleChange}
        type="password"
        placeholder="Пароль"
        minLength="6"
        maxLength="200"
        required
      />
      <button
        type="submit"
        className="form-auth__save-button"
      >
        Войти
      </button>
    </form>
  );
};

export default Login;
