const Card = require('../models/card');
const customError = require('../errors');

module.exports = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        next(new customError.NotFoundError('Карточки с указанным id не существует.'));
      }
      if (card.owner.toHexString() !== req.user._id) {
        next(new customError.ForbiddenRequestError('Вы не можете удалить карточку другого пользователя.'));
      }
      return next();
    })
    .catch(next);
};
