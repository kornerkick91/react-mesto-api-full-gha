export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(this._handleResponse)
  }

  addElement(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(this._handleResponse)
  }

  deleteElement(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
      .then(this._handleResponse)
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._handleResponse)
    }
  }

  editAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar: url
        })
    })
    .then(this._handleResponse)
  }
}
