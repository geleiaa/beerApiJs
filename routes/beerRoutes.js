const express = require('express');

const beerController = require('./../controllers/beerControll')

const router = express.Router();

//router.param('id', beerController.checkId);

/*router
    .route('/beer-stats')
    .get(beerController.businessPlan);
// Route for businessPlan Function    
*/


router
    .route('/beer-stats').get(beerController.beerStats);

router
    .route('/top-3-better')
    .get(beerController.aliasBeers , beerController.getAllBeers);

router
    .route('/')
    .get(beerController.getAllBeers)
    .post(beerController.createBeer);

router
    .route('/:id')
    .get(beerController.getOneBeer)
    .patch(beerController.updateBeer)
    .delete(beerController.deleteBeer);

module.exports = router;    