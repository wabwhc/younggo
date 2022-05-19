const Sequelize = require('sequelize');

module.exports = class Apply_lesson extends Sequelize.Model {
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
                primaryKey: true,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'apply_lesson',
            tableName: 'apply_lesson',
            paranoid: false,
            charset: 'utf8', // 한글 설정 
            collate: 'utf8_general_ci', 
        })
    }

    static associate(db){
        db.Apply_lesson.belongsTo(db.User, {foreignKey:'useremail', targetKey:'useremail'});
        db.Apply_lesson.belongsTo(db.Lesson, {foreignKey:'lesson_id', targetKey:'lesson_id'});
    }
}