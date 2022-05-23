const Sequelize = require('sequelize');

module.exports = class Well extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            well_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            well_title: {
                type: Sequelize.STRING(100),
            },
            well_reply: {
                type: Sequelize.STRING(500),
            },
            well_author: {
                type: Sequelize.STRING(100),
                defaultValue: '관리자'
            },
            well_category: {
                type: Sequelize.STRING(100),
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'well',
            tableName: 'wells',
            paranoid: false,
            charset: 'utf8', // 한글 설정 
            collate: 'utf8_general_ci', 
        })
    }

    static associate(db){
        
    }
    
}