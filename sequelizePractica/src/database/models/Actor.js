const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Actor = sequelize.define('Actor', {
        first_name: {
            type: DataTypes.STRING(100),  
            allowNull: false
        }, 
        last_name: {
            type: DataTypes.STRING(100),  
            allowNull: false
        }, 
        rating: {
            type: DataTypes.DECIMAL(3, 1)
        },         
        favorite_movie_id: {
            type: DataTypes.INTEGER
        } 
    });
    Actor.associate = models => {
        Actor.belongsToMany(models.Movie, {
            through: 'actor_movie'
        })
    };

    return Actor;
}