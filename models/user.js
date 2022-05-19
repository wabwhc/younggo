const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            useremail: {
                type: Sequelize.STRING(100),
                allowNull: false,
                primaryKey: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            usercode: {
                type: Sequelize.STRING(100),
            },
            usercomment: {
                type: Sequelize.STRING(100),
            },
            phonenum: {
                type: Sequelize.STRING(100),
            },
            img: {
                type: Sequelize.STRING(100),
            },
            usercreate_at: {
                type: 'timestamp',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            userdelete_at: {
                type: 'timestamp',
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'user',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8', // 한글 설정
            collate: 'utf8_general_ci',
        })
    }

    static associate(db){
        db.User.hasMany(db.Article, {foreignKey:"email", sourceKey:'useremail'})
    }

}
