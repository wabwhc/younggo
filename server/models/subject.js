const Sequelize = require('sequelize');

module.exports = class Subject extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            subject: {
                type: Sequelize.STRING(100),
                allowNull: false,
                primaryKey: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'subject_name',
            tableName: 'subjects',
            paranoid: false,
            charset: 'utf8', // 한글 설정 
            collate: 'utf8_general_ci', 
        })
    }

    static associate(db){
        db.Subject.hasMany(db.Study, {foreignKey:"subject", sourceKey:'subject'})
        db.Subject.hasMany(db.Lesson, {foreignKey:"subject", sourceKey:'subject'})
    }
    
}