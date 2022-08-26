const modelCategory = require('../Models/ModelCategory')

const controllerCategory = {
    async createCat(req, res) {
        const cat = new modelCategory({
            name: req.body.name,
        });
        try {
            await cat.save();
            res.send("category created")
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async updateCat(req, res) {
        try {
            await modelCategory.findOneAndUpdate(
                {
                    _id: Object(req.body._id)
                },
                {
                    $set: {
                        name: req.body.name,
                        active: req.body.active,
                    }
                }
            )
            res.status(200).send("-category updated")
        } catch (error) {
            res.status(400).send("updated cat failed : " + error)
        }
    },

    async deleteCat(req, res) {
        try {
            let deletedCat = await modelCategory.findByIdAndDelete({ _id: req.body._id })
            if (!deletedCat) res.status(400).send("not deleted because : " + deletedQuest)
            res.status(200).send("cat deleted")
        } catch (error) {
            res.status(400).send("delete failed : " + error)
        }
    },

    async getAllCat(req, res) {
        try {
            const allCat = await modelCategory.find({
                "active": true
            })
            if (!allCat) res.status(400).send("not existed")
            res.status(200).send(allCat);
        } catch (error) {
            res.status(200).send(error)
        }
    }


}
module.exports = controllerCategory;