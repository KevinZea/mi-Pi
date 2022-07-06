const { Router } = require('express');
const router = Router();
const {
    getCountries, 
    getCountriesById } = require('../controlers')


router.get('/', getCountries);

router.get('/:idPais', getCountriesById);


module.exports = router;