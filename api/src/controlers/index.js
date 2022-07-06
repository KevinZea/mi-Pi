const axios = require('axios');

const { Country, Actividad, Countryexercise } = require('../db')

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiUrl.data.map(s => {

        return {
            id: s.cca3,
            name: s.translations.spa.common,
            capital: s.capital && s.capital[0],
            population: s.population,
            flag: s.flags && s.flags[1],
            area: s.area,
            continent: s.continents && s.continents[0],
            region: s.region,
            subregion: s.subregion,
        }


    });

    return apiInfo;
}

const getDbInfo = async () => {
    return await Country.findAll({
        include: {
            model: Actividad,
            attributes: ['name', 'difficulty', 'duration', 'season', 'id'],
            through: {
                attributes: [],
            }
        },
    });
}

const getCountries = async (req, res) => {
    const name = req.query.name 

    let countriesAll = await getDbInfo();

    if (countriesAll.length === 0) {
        // console.log('listo');
        countriesAll = await getApiInfo();
        countriesAll.forEach(e => {
            
            Country.findOrCreate({
                where: {
                    id: e.id,
                    name: e.name,
                    capital: e.capital ? e.capital : 'No Capital',
                    population: e.population,
                    flag: e.flag,
                    area: e.area,
                    continent: e.continent,
                    region: e.region ? e.region : 'No Region',
                    subregion: e.subregion  ? e.subregion : 'No Region',
                }
            })
        });

    } else if (name) {
        let countryName = await countriesAll.filter(a => a.name.toLowerCase().includes(name.toLowerCase()))
        try {
            res.status(200).send(countryName)
        } catch (error) {
            res.status(404).send(error)
        }   
    } else {
        res.status(200).send(countriesAll)
    }
}

const getCountriesById = async (req, res) => {
    const { idPais } = req.params;
    let countriesAll = await getDbInfo();
    if (idPais) {
        let countryInfo = await countriesAll.find(a => a.id.toLowerCase() === idPais.toLowerCase())
        res.status(200).send(countryInfo)
    } else {
        res.status(404).send('no hay ciudad con ese id')
    }
}

const getActivitieByName =  async (req, res) => {
    const { value } = req.params;
    const getCountries = await getDbInfo();

    const filter = getCountries.filter(c => {
        let countryAct = c.actividads.map(el => el.name.toLowerCase());
        return countryAct.includes(value.toLowerCase()) ? c : null
    })
    try {
        res.status(200).send(filter)
    } catch (error) {
        res.status(404).send(error)
    }
}

const postActivity = async (req, res) => {
    let { name, difficulty, duration, season, country } = req.body;
 
    let activity = await Actividad.create({
        name,
        difficulty,
        duration,
        season,
    });

    let idCountries = await Country.findAll({
        where: { id: country }
    })

    activity.addCountry(idCountries)

    res.send('atividad creada')
}
const deletedActivity = async ( req, res)=>{
     const {idPais, idActividad } = req.params;
     Number(idActividad)
     try {
        await Countryexercise.destroy({
             where:{
                countryId : idPais ,
                //activityId: idActividad
                exerciseId : idActividad
                //actividadsId: idActividad
                //CountryexerciseId: idActividad
             }
         })
         const country = await getDbInfo();
         const sendCountry = country.find(e=>e.id === idPais)
         res.send(sendCountry)
     } catch (error) {
         res.status(404).send(error)
     }
}
module.exports ={
    getApiInfo , 
    getDbInfo, 
    getCountries,
    getCountriesById,
    getActivitieByName,
    postActivity,
    deletedActivity
}