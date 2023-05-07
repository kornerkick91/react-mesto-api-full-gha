function PopupWithForm({ title, name, isOpen, onClose, isLoading, buttonText, children, onSubmit }) {

  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" onClick={onClose} className="popup__close-button" aria-label="кнопка 'Закрыть'"></button>
        <h2 className="popup__heading">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__save-button">{isLoading ? "Сохранение..." : buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
