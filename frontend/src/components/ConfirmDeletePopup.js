import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ isOpen, onClose, onCardDelete, card }) {
  const handleCardDelete = (e) => {
    e.preventDefault();

    onCardDelete(card);
  };

  return <PopupWithForm title="Вы уверены?" name="confirm-delete-form" buttonText="Да" isOpen={isOpen} onClose={onClose} onSubmit={handleCardDelete}></PopupWithForm>;
}

export default ConfirmDeletePopup;
