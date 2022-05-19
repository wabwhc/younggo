const Sequelize = require('sequelize');
const User = require('./user');
const Article = require('./article');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Article = Article;

User.init(sequelize);
Article.init(sequelize);

User.associate(db);
Article.associate(db);

module.exports = db;
