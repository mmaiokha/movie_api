const sequelize = require('../config/db.config')
const {DataTypes} = require('sequelize')

const Movie = sequelize.define('movies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    original_title: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    tagline: {
        type: DataTypes.STRING
    },
    overview: {
        type: DataTypes.STRING
    },
    poster_path: {
        type: DataTypes.STRING,
        default: 'movie_default.jpg'
    },
    release_date: {
        type: DataTypes.DATE
    },
    runtime: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.ENUM('Released', 'Upcoming')
    },
    revenue: {
        type: DataTypes.INTEGER
    },
    budget: {
        type: DataTypes.INTEGER
    },
    votes_average: {
        type: DataTypes.INTEGER,
        default: 0
    },
    votes_count: {
        type: DataTypes.INTEGER,
        default: 0
    },
    imdb_id: {
        type: DataTypes.STRING
    },
    original_language: {
        type: DataTypes.STRING
    },
    spoken_language: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    }
})

module.exports = Movie
