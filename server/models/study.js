const Sequelize = require('sequelize');

module.exports = class Study extends Sequelize.Model {
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
            },
            subject: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            study_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            study_comment: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            study_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            study_create_at: {
                type: 'timestamp',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'study',
            tableName: 'studys',
            paranoid: false,
            charset: 'utf8', // 한글 설정 
            collate: 'utf8_general_ci', 
        })
    }

    static associate(db){
        db.Study.belongsTo(db.User, {foreignKey:'useremail', targetKey:'useremail'});
        db.Study.belongsTo(db.Subject, {foreignKey:'subject', targetKey:'subject'});
        db.Study.hasMany(db.Apply_study, {foreignKey:"study_id", sourceKey:'study_id'})
    }
    
}