const sequelize = require('../config/db.config')
const {DataTypes} = require('sequelize')

const Review = sequelize.define('reviews', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    review: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        require: false,
        validate: {
            min: 0,
            max: 5
        }
    }
})

module.exports = Review