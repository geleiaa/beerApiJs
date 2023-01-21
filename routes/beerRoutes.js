const express = require('express');

const beerController = require('./../controllers/beerControll')

const router = express.Router();
const app = require('./../app');

/** 
* @swagger
* /:
*  get:
*      description: Retora as beers com o maior Rating.
*      responses:
*          200:
*              description: html content
*/
router
    .route('/beer-stats').get(beerController.beerStats);

router
    .route('/top-3-better')
    .get(beerController.aliasBeers, beerController.getAllBeers);

/** 
* @swagger
* /:
*  get:
*      description: Retora todas as Beers, também pode ser usado filtros na url.
*      responses:
*          200:
*              description: html content
*/

/**
* @swagger
* /:
*  post:
*      description: Resgistra as Beers.
*      responses:
*          201:
*              description: html content
*/
router
    .route('/')
    .get(beerController.getAllBeers)
    .post(beerController.createBeer);

router
    .route('/:id')
    .get(beerController.getOneBeer)
    .patch(beerController.updateBeer)
    .delete(beerController.deleteBeer);
//
module.exports = router;    