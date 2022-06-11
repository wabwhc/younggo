const Sequelize = require('sequelize');

module.exports = class Reply extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            reply_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            useremail: {
                type: Sequelize.STRING(100),
            },
            article_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            reply_content: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: "답변 대기중",
            },
            reply_at: {
                type: 'timestamp',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'reply',
            tableName: 'replys',
            paranoid: false,
            charset: 'utf8', // 한글 설정
            collate: 'utf8_general_ci',
        })
    }

    static associate(db){
        db.Reply.belongsTo(db.User, {foreignKey:'useremail', targetKey:'useremail'});
        db.Reply.belongsTo(db.Article, {foreignKey:'article_id', targetKey:'article_id'});
    }

}
