const Sequelize = require('sequelize');

module.exports = class Apply_study extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            study_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            useremail: {
                type: Sequelize.STRING(100),
                allowNull: false,
                primaryKey: true,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'apply_study',
            tableName: 'apply_study',
            paranoid: false,
            charset: 'utf8', // 한글 설정 
            collate: 'utf8_general_ci', 
        })
    }

    static associate(db){
        db.Apply_study.belongsTo(db.User, {foreignKey:'useremail', targetKey:'useremail'});
        db.Apply_study.belongsTo(db.Study, {foreignKey:'study_id', targetKey:'study_id'});
    }
}