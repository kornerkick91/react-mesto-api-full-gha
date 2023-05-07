function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_element-image ${card.name ? 'popup_opened' : ''}`}>
        <div className="popup__image-container">
          <button type="button" className="popup__close-button" onClick={onClose} aria-label="кнопка 'Закрыть'"></button>
          <img className="popup__image" src={card.link} alt={card.name} />
          <h2 className="popup__image-heading">{card.name}</h2>
        </div>
    </div>
  );
}

export default ImagePopup;
