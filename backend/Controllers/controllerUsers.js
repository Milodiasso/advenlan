const modelUsers = require('../Models/ModelUsers')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")


const controllerUsers = {
    async createUser(req, res) {
        const { mail, password, userId, pseudo } = req.body;
        if (!mail && !password && !pseudo) {
            return res.status(402).send("All input is required");
        }
        try {
            existingUser = await modelUsers.findOne({ mail: mail });
        } catch {
            const error = new Error("Error! Something went wrong.");
            return next(error);
        }
        if (existingUser) {
            return res.status(409).send("user already exist")
        }
        let encryptedPassword = await bcrypt.hash(password, 10);

        const user = new modelUsers({
            user_id: userId,
            pseudo: pseudo,
            mail: mail.toLowerCase(),
            password: encryptedPassword
        });
        try {
            await user.save();
            res.send("user created")
        } catch (error) {
            res.status(400).send(error)
        }

    },

    async connect(req, res) {


        try {
            const { mail, password } = req.body;

            if (!(mail && password)) {
                res.status(400).send("All input is required");
            }
            const user = await modelUsers.findOne({ mail });
            console.log(process.env.JWT_SECRET_KEY);
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    user.toJSON(),
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                // let cp_user = { ...user }._doc
                // cp_user.token = token;
                // delete cp_user.password
                // console.log(cp_user);
                res.status(200).send(token);
            } else {
                res.status(400).send("Invalid Credentials");
            }
        } catch (err) {
            console.log(err);
        }
    },


    async updateUserByUser(req, res) {
        let encryptedPassword = ""
        let updatedFields = {}
        for (field in req.body) {
            if (req.body[field]) {
                updatedFields[field] = req.body[field]
            }
        }
        console.log(updatedFields)
        try {
            if (req.body.password != "") {
                encryptedPassword = await bcrypt.hash(password, 10);
            }
            await modelUsers.findOneAndUpdate({
                _id: Object(req.user._id)
            },
                {
                    $set: updatedFields
                })
            res.status(200).send("user updated")
        } catch (error) {
            res.send('not updated : ' + error)
        }
    },

    async deleteUser(req, res) {
        try {
            await modelUsers.findOneAndDelete({
                _id: Object(req.user._id)
            })
            res.status(200).send('user deleted success')
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async getAllUsers(req, res) {
        try {
            const allUsers = await modelUsers.find({ active: true })
            res.status(200).send(allUsers)
        } catch (error) {
            res.status(400).send("find users : " + error)
        }
    },

    async userData(req, res) {
        try {
            const user = await modelUsers.findOne({
                _id: Object(req.user._id)
            })
            if (user._id == req.user._id) {
                delete req.user.password
                console.log(req.user);
                res.status(200).json(req.user)
            } else {
                res.status(409).send("security")
            }
        } catch (error) {
            res.status(400).send(error)
        }
    }
}
module.exports = controllerUsers;