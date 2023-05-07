import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onDeleteButtonClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = (card.owner._id || card.owner) === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked && 'element__like-button_type_active'}`
  );;

  return (
    <article className="element">
      {isOwn && <button type="button" className="element__delete-button" onClick={() => onDeleteButtonClick(card)} aria-label="кнопка 'Удалить'"></button>}
      <img className="element__image" onClick={() => onCardClick(card)} src={card.link} alt={card.name} />
      <div className="element__description">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={() => onCardLike(card)} aria-label="кнопка 'Мне нравится'"></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
