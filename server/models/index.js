const Sequelize = require('sequelize');

const Well = require('./Well');
const User = require('./user');
const Article = require('./article');
const Reply = require('./reply');
const Lesson = require('./lesson');
const Apply_lesson = require('./apply_lesson');
const Apply_study = require('./apply_study');
const Subject = require('./subject');
const Study = require('./study');
const Japan_info = require('./japan_info');

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];
const db = {};

const  sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
//db.Sequelize = sequelize;


db.Well = Well;
Well.init(sequelize);
Well.associate(db);
db.User = User;
db.Article = Article;
db.Subject = Subject;
db.Study = Study;
db.Reply = Reply;
db.Lesson = Lesson;
db.Apply_lesson = Apply_lesson;
db.Apply_study = Apply_study;
db.Japan_info = Japan_info;

User.init(sequelize);
Article.init(sequelize);
Subject.init(sequelize);
Study.init(sequelize);
Apply_lesson.init(sequelize);
Apply_study.init(sequelize);
Apply_lesson.init(sequelize);
Reply.init(sequelize);
Lesson.init(sequelize);
Japan_info.init(sequelize);

User.associate(db);

Article.associate(db);
Reply.associate(db);

Subject.associate(db);
Study.associate(db);
Lesson.associate(db);

Apply_lesson.associate(db);
Apply_study.associate(db);

Japan_info.associate(db);

module.exports = db;
