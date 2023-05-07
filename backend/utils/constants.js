const JWT_SECRET = 'super-secret-key';
const urlRegex = /https?:\/\/(www\.)?[-\w@:%\.\+~#=]{1,256}\.[a-z0-9()]{2,6}\b([-\w()@:%\.\+~#=//?&]*)/i; //eslint-disable-line

module.exports = {
  urlRegex,
  JWT_SECRET
};
