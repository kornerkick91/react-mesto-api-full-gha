import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarLink = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarLink.current.value);
  }

  useEffect(() => {
    if (!isOpen) {
      avatarLink.current.value = '';
    }
  }, [isOpen]);

  return (
    <PopupWithForm title="Обновить аватар" name="avatar-form" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} buttonText="Сохранить">
      <input
        id="avatar-link-input"
        ref={avatarLink}
        type="url"
        className="popup__input popup__input_avatar_link"
        name="avatar"
        required
        placeholder="Ссылка на аватар" />
      <span className="avatar-link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
