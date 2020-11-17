const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
        name: {
            type: DataTypes.STRING(100), 
            allowNull: false
        }, 
        ranking: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        } 
    },
    {
        tablename: 'genres'
    }); 
    Genre.associate = models => {
        Genre.hasMany(models.Movie)
    }

    return Genre;
}