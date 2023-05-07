import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import InfoTooltip from './InfoTooltip';
import { useState, useEffect } from 'react';
import Api from '../utils/api';
import { auth } from '../utils/auth';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [imagePopupCard, setImagePopupCard] = useState({});
  const [deletingCard, setDeletingCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [err, setErr] = useState(false);
  const [infoTooltipText, setInfotooltipText] = useState('');

  const navigate = useNavigate();

  const api = new Api({
    url: 'https://api.kornerkick91.nomoredomains.monster',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}` || '',
    },
  });


  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/');
            setEmail(res.data.email);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSignOut = () => {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('jwt');
  };

  useEffect(() => {
    loggedIn && Promise.all([api.getProfile(), api.getCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  const handleRegister = (email, password) => {
    if (!email || !password) {
      return;
    }
    auth.register(email, password)
      .then(() => {
        setErr(false);
        setInfotooltipText('Вы успешно зарегистрировались!');
        setIsInfoTooltipOpen((prev) => !prev);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setErr(true);
        setInfotooltipText('Что-то пошло не так! Попробуйте ещё раз.');
        setIsInfoTooltipOpen((prev) => !prev);
        console.log(err);
      });
  };

  const handleLogin = (email, password) => {
    if (!email || !password) {
      return;
    }
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setEmail(email);
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        setErr(true);
        setInfotooltipText('Что-то пошло не так! Попробуйте ещё раз.');
        setIsInfoTooltipOpen((prev) => !prev);
        console.log(err);
      });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (data) => {
    setImagePopupCard(data);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setImagePopupCard({});
  };

  const handleCloseByEsc = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  };

  const handleCloseByClickOnOverlay = (e) => {
    if (e.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  };

  useEffect(() => {
    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmDeletePopupOpen || imagePopupCard || isInfoTooltipOpen) {
      document.addEventListener('keydown', handleCloseByEsc);
      document.addEventListener('mousedown', handleCloseByClickOnOverlay);
    }

    return () => {
      document.removeEventListener('keydown', handleCloseByEsc);
      document.removeEventListener('mousedown', handleCloseByClickOnOverlay);
    };
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isConfirmDeletePopupOpen, imagePopupCard, isInfoTooltipOpen]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteButtonClick = (card) => {
    setDeletingCard(card);
    setIsConfirmDeletePopupOpen(true);
  };

  const handleCardDelete = (card) => {
    api.deleteElement(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (user) => {
    setIsLoading(true);
    api.editProfile(user)
      .then(() => {
        setCurrentUser({ ...currentUser, name: user.name, about: user.about });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api.editAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);
    api.addElement(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <CurrentUserContext.Provider value={{currentUser}}>
        <Header email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onDeleteButtonClick={handleDeleteButtonClick}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />
        <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} card={deletingCard} />
        <ImagePopup card={imagePopupCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          err={err}
          infoTooltipText={infoTooltipText}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
