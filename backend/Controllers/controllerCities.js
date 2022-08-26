const ModelCities = require('../Models/ModelCities');

const controllerCities = {
    async createCity(req, res) {
        const cat = new ModelCities({
            name: req.body.name,
            postal_code: req.body.postal_code,
            country: req.body.country,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        });
        try {
            await cat.save();
            res.send("city created")
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async updateCity(req, res) {
        try {
            await ModelCities.findOneAndUpdate(
                {
                    _id: Object(req.body._id)
                },
                {
                    $set: {
                        name: req.body.name,
                        postal_code: req.body.postal_code,
                        country: req.body.country,
                        latitude: req.body.latitude,
                        longitude: req.body.longitude,
                    }
                }
            )
            res.status(200).send("-city  updated")
        } catch (error) {
            res.status(400).send("updated city failed : " + error)
        }
    },

    async deleteCity(req, res) {
        try {
            let deletedCity = await ModelCities.findByIdAndDelete({ _id: req.body._id })
            if (!deletedCity) res.status(400).send("not deleted because : " + deletedCity)
            res.status(200).send("city deleted")
        } catch (error) {
            res.status(400).send("delete failed : " + error)
        }
    },

    async getAllCities(req, res) {
        try {
            const allCities = await ModelCities.find()
            if (!allCities) res.status(400).send("not existed")
            res.status(200).send(allCities);
        } catch (error) {
            res.status(200).send(error)
        }
    }


}
module.exports = controllerCities;