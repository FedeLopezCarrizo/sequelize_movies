const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
        title: {
            type: DataTypes.STRING(500), 
            allowNull: false
        }, 
        rating: {
            type: DataTypes.DECIMAL(3, 1),   
            allowNull: false
        }, 
        awards: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 
        release_date: {
            type: DataTypes.DATEONLY, 
            allowNull: false
        }, 
        length: {
            type: DataTypes.INTEGER
        }, 
        genre_id: {
            type: DataTypes.INTEGER
        } 
    });
    Movie.associate = (models => {
        Movie.belongsTo(models.Genre);
        Movie.belongsToMany(models.Actor, {
            as: 'actores', 
            through:'actor_movie'
        })
    });

    return Movie;
}