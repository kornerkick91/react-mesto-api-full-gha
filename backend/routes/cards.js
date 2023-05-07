const cardsRouter = require('express').Router();
const { celebrate } = require('celebrate');
const authDeleteCard = require('../middlewares/authDeleteCard');

const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
} = require('../celebrateValidation');

const {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate(createCardValidation), createCard);
cardsRouter.delete('/:cardId', celebrate(deleteCardValidation), authDeleteCard, deleteCard);
cardsRouter.put('/:cardId/likes', celebrate(likeCardValidation), putLikeCard);
cardsRouter.delete('/:cardId/likes', celebrate(likeCardValidation), deleteLikeCard);

module.exports = cardsRouter;
