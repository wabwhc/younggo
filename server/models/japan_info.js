const Sequelize = require('sequelize');

module.exports = class Japan_info extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            url: {
                type: Sequelize.STRING(10000),
            },
            content: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            uploader: {
                type: Sequelize.STRING(100),
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Japan_info',
            tableName: 'Japan_infos',
            paranoid: false,
            charset: 'utf8', // 한글 설정
            collate: 'utf8_general_ci',
        })
    }

    static associate(db) {
        db.Japan_info.belongsTo(db.User, {foreignKey: "uploader", targetKey: 'useremail'})
    }

}
