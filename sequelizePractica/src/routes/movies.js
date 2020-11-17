const express = require('express');
const router = express.Router();

/* Controller Require */
const moviesController = require('../controllers/moviesController');


router.get('/', moviesController.all); 
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recommended);
router.get('/create', moviesController.create);
router.get('/detail/:id', moviesController.detail);
router.get('/edit/:id', moviesController.edit);

router.post('/create', moviesController.store);
router.post('/search', moviesController.search);
router.post('/delete/:id', moviesController.delete);

router.put('/edit', moviesController.update);

module.exports = router;