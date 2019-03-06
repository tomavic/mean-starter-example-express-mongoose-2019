// DB.js
const username = 'tomas';
const password = 'tomas%40admin19';


module.exports = {
  DB: `mongodb://localhost/resthub`,
  liveDB: `mongodb+srv://${username}:${password}@cluster0-liccb.mongodb.net/test?retryWrites=true`
};