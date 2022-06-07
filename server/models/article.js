const Sequelize = require('sequelize');

module.exports = class Article extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            article_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            article_title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            useremail: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            article_content: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            article_at: {
                type: 'timestamp',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            category: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'article',
            tableName: 'articles',
            paranoid: false,
            charset: 'utf8', // 한글 설정
            collate: 'utf8_general_ci',
        })
    }

    static associate(db){
        db.Article.belongsTo(db.User, {foreignKey:'useremail', targetKey:'useremail'});
        db.Article.hasMany(db.Reply, {foreignKey:"article_id", sourceKey:'article_id'})
    }
}
