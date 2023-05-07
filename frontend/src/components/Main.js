import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onDeleteButtonClick }) {

  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
            <button type="button" className="profile__edit-button" onClick={onEditProfile} aria-label="кнопка 'Редактировать'"></button>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace} aria-label="кнопка 'Добавить'"></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onDeleteButtonClick={onDeleteButtonClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
