const modelSubCategory = require('../Models/ModelSubCategory')

const controllerSubCategory = {
    async createSubCategory(req, res) {
        const subCat = new modelSubCategory({
            id_cat: req.body.id_cat,
            name: req.body.name,
            description: req.body.description,
        });
        try {
            await subCat.save();
            res.send("Sub-category created")
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async updateSubCat(req, res) {
        try {
            await modelSubCategory.findOneAndUpdate(
                {
                    _id: Object(req.body._id)
                },
                {
                    $set: {
                        id_cat: req.body.id_cat,
                        name: req.body.name,
                        description: req.body.description,
                    }
                }
            )
            res.status(200).send("Sub-category updated")
        } catch (error) {
            res.status(400).send("updated sub-cat failed : " + error)
        }
    },

    async deleteSubCat(req, res) {
        try {
            let deletedSubCat = await modelSubCategory.findByIdAndDelete({ _id: req.body._id })
            if (!deletedSubCat) res.status(400).send("not deleted because : " + deletedQuest)
            res.status(200).send("sub-cat deleted")
        } catch (error) {
            res.status(400).send("delete failed : " + error)
        }
    },

    async getAllSubCat(req, res) {
        try {
            const allSubCat = await modelSubCategory.find({
                "active": true
            })
            if (!allSubCat) res.status(400).send("not existed")
            res.status(200).send(allSubCat);
        } catch (error) {
            res.status(200).send(error)
        }
    }
}
module.exports = controllerSubCategory;