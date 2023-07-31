const sequelize = require('../config/db.config')
const {DataTypes} = require('sequelize')

const ProductionCompany = sequelize.define('production_companies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    logo_path: {
        type: DataTypes.STRING,
        default: 'company_default.jpg'
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    origin_country: {
        type: DataTypes.STRING
    }
})

module.exports = ProductionCompany