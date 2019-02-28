// DB.js
const username = 'tomas';
const password = 'tomas%40admin19';


module.exports = {
  DB: `mongodb://localhost/resthub`,
  liveDB: `mongodb://${username}:${password}@cluster0-shard-00-00-liccb.mongodb.net:27017,cluster0-shard-00-01-liccb.mongodb.net:27017,cluster0-shard-00-02-liccb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
};