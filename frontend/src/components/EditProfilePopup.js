import { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const { currentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }

    if (!isOpen) {
      setName('');
      setDescription('');
    }
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="profile-form" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} buttonText="Сохранить">
      <input id="name-input" type="text" className="popup__input popup__input_info_name" onChange={handleNameChange} value={name} name="name" required minLength="2" maxLength="40" placeholder="Имя" />
      <span className="name-input-error popup__input-error"></span>
      <input id="about-input" type="text" className="popup__input popup__input_info_about" onChange={handleAboutChange} value={description} name="about" required minLength="2" maxLength="200" placeholder="Вид деятельности" />
      <span className="about-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
