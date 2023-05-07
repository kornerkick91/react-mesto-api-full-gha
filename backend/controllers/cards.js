const customError = require('../errors');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new customError.IncorrectDataError('Переданы некорректные данные при создании карточки.'));
      }
      next(error);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .then((card) => {
      if (card.deletedCount === 0) {
        throw new customError.NotFoundError('Запрашиваемая карточка не найдена.');
      }
      return res.send({ message: 'Карточка удалена!' });
    })
    .catch(next);
};

const findCard = (card, res) => {
  if (!card) {
    throw new customError.NotFoundError('Запрашиваемая карточка не найдена.');
  }
  return res.send(card);
};

const putLikeCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true, runValidators: true }
  )
    .then((card) => findCard(card, res))
    .catch(next);
};

const deleteLikeCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true, runValidators: true }
  )
    .then((card) => findCard(card, res))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard
};
