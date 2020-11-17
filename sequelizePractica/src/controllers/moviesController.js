const {Movie, Genre, Actor, sequelize} = require('../database/models');
const moment = require('moment');
const db = require('../database/models');

module.exports = {
    all: async (req, res) => {
        try {
            const movies = await Movie.findAll({ include: ['Genre', 'actores'] });
            res.render('movies', { movies });
        } catch (error) {
            console.log(error);
        }
    }, 
    detail: async (req, res) => {
        try {
            const movieDetail = await Movie.findByPk(req.params.id);
            res.render('movieDetail', { movieDetail, moment: moment });
            
        } catch (error) {
            console.log(error);
        }
    }, 
    new: async (req, res) => {
        try {
            let moviesRegistros = await Movie.count();
            if (moviesRegistros > 5){
                moviesRegistros = moviesRegistros - 5;
            }else
            {
                moviesRegistros = 0;
            }

            const moviesTop = await Movie.findAll({
                order: [
                    ["release_date", "ASC"],
                    ["title", "ASC"]
                ], 
                limit: 5,
                offset: moviesRegistros
            });
            res.render('new', { moviesTop, moment: moment });
        } catch (error) {
            console.log(error);
        }
    },
    recommended: async (req, res) => {
        try {
            const moviesRecommended = await Movie.findAll({
                where: {
                    rating: {[db.Sequelize.Op.gt] : 8}
                }, 
                order: [
                    ["rating", "DESC"]
                ]
            });
            res.render('recommended', { moviesRecommended, moment: moment });
        } catch (error) {
            console.log(error);
        }
    }, 
    search: async (req, res, next) => {
        try {
            const moviesSearch = await Movie.findAll({
            where: {
                title: {[db.Sequelize.Op.like] : '%' + req.body.keywords + '%'}
            },
            order: [
                [req.body.order, req.body.desc_asc]
            ]
        });
        res.render('search', { moviesSearch, moment: moment });
        } catch (error) {
            console.log(error);
        }
    }, 
    create: async (req, res) => {
        try {
            const generos = await Genre.findAll();
            res.render('create', { generos });
        } catch (error) {
            console.log(error);
        }
    }, 
    store: async (req, res, next) => {
        try {
            const newMovie = await Movie.create(req.body);
            res.redirect('/movies');
        } catch (error) {
            console.log(error);
        }
    }, 
    edit: async (req, res) => {
        try {
            const movieId = req.params.id;
            const movieToEdit = await Movie.findByPk(movieId, { include: ['Genre', 'actores']});
            const generos = await Genre.findAll();
            const actores = await Actor.findAll();

            res.render('edit', { movieToEdit, generos, actores, moment: moment });
        } catch (error) {
            console.log(error);
        }
    }, 
    update: async (req, res, next) => {
        try {
            const movieId = req.params.id;
            const updateMovie = await Movie.findByPk(movieId, { include:['Genre', 'actores'] });
            
            await updateMovie.removeActores(updateMovie.actores);
            await updateMovie.addActores(req.body.actores);
            await updateMovie.update(req.body);

            res.redirect('/movies/detail/' + movieId);
        } catch (error) {
            console.log(error);
        }
    }, 
    delete: async (req, res, next) => {
        try {
            const movieId = req.params.id; 
            const deleteMovie = await Movie.findByPk(movieId,{include: ['Genre', 'actores'] });
            res.json(deleteMovie)
            await deleteMovie.removeActores(deleteMovie.actores);
            deleteMovie.destroy({
                where: {
                    id: movieId
                }
            }); 
            res.redirect("/movies");
        } catch (error) {
            console.log(error);
        }
    }
}