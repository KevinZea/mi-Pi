const { Router } = require('express');
const router = Router();

const {
    getActivitieByName, 
    postActivity,
    deletedActivity} = require('../controlers')
    

    router.get('/:value', getActivitieByName);


    //router.delete('/:idPais/:idActividad', deletedActivity)

    router.post('/', postActivity);

    module.exports = router;