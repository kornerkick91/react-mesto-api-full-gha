import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [elementName, setElementName] = useState('');
  const [elementLink, setElementLink] = useState('');

  function handleElementNameChange(e) {
    setElementName(e.target.value);
  }

  function handleElementLinkChange(e) {
    setElementLink(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: elementName,
      link: elementLink,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setElementName('');
      setElementLink('');
    }
  }, [isOpen]);

  return (
    <PopupWithForm title="Новое место" name="element-form" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} buttonText="Сохранить">
      <input
        id="element-name-input"
        type="text"
        className="popup__input popup__input_element_name"
        value={elementName}
        onChange={handleElementNameChange}
        name="elementName"
        required
        minLength="2"
        maxLength="30"
        placeholder="Название" />
      <span className="element-name-input-error popup__input-error"></span>
      <input
        id="element-link-input"
        type="url"
        className="popup__input popup__input_element_link"
        value={elementLink}
        onChange={handleElementLinkChange}
        name="elementLink"
        required
        placeholder="Ссылка на картинку" />
      <span className="element-link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
