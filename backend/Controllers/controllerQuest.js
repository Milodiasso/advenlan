const modelQuest = require('../Models/ModelQuest')

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const controllerQuest = {
    async createQuest(req, res) {
        const { id_sub_cat, title, description, location, id_leader, city, event_date } = req.body

        if (event_date > new Date().addDays(7)) {
            res.status(400).send("event date max 7 days")
            return false;
        }
        const quest = new modelQuest({
            id_sub_cat: id_sub_cat,
            title: title,
            description: description,
            location: location,
            user_id_leader: id_leader,
            city: city,
            event_date: event_date

        });
        try {
            await quest.save();
            res.send("quest created")
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async updateQuest(req, res) {
        const { title, description, location, id_leader, city, event_date } = req.body

        let questForUpdate = {
            title: title,
            description: description,
            location: location,
            event_date: event_date,
            updatedAt: Date.now(),
            expiratedAt: Date.now() + 10,
            city: city,
        }
        if (questForUpdate.event_date == "" || questForUpdate.event_date == undefined) {
            delete questForUpdate.updatedAt
            delete questForUpdate.expiratedAt
        } else if (quest.event_date > new Date().addDays(7)) {
            res.status(400).send("event date max 7 days")
            return false;
        }
        try {
            await modelQuest.findOneAndUpdate(
                { _id: Object(req.body._id) },
                {
                    $set: questForUpdate
                }
            )
            res.status(200).send('qeust updated')
        } catch (error) {
            res.status(400).send("quest didnt updated : " + error)
        }
    },

    async deleteQuest(req, res) {
        try {
            console.log(req.body);
            let deletedQuest = await modelQuest.findByIdAndDelete(req.body._id)
            if (!deletedQuest) {
                res.status(400).send("not deleted because : " + deletedQuest)
                return false;
            }
            res.status(200).send("delete Quest");
        } catch (error) {
            res.status(400).send("delete failed : " + error)
        }
    },

    async getAllQuest(req, res) {
        try {
            const allQuest = await modelQuest.find({
                "expiratedAt": { $gte: Date.now() },
                "active": true
            })
            if (!allQuest) res.status(400).send("no quest")
            res.status(200).send(allQuest);
        } catch (error) {
            res.status(200).send(error)
        }
    }
}
module.exports = controllerQuest;