const Sequelize = require('sequelize');

module.exports = class Lesson extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            lesson_id: {
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
            },
            lesson_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            lesson_comment: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            lesson_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            lesson_create_at: {
                type: 'timestamp',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'lesson',
            tableName: 'lessons',
            paranoid: false,
            charset: 'utf8', // 한글 설정 
            collate: 'utf8_general_ci', 
        })
    }

    static associate(db){
        db.Lesson.belongsTo(db.User, {foreignKey:'useremail', targetKey:'useremail'});
        db.Lesson.belongsTo(db.Subject, {foreignKey:'subject', targetKey:'subject'});
        db.Lesson.hasMany(db.Apply_lesson, {foreignKey:"lesson_id", sourceKey:'lesson_id'})
    }
    
}