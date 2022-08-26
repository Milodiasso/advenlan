const router = require('express').Router()
const controllerCategory = require('../Controllers/controllerCategory');
const controllerQuest = require('../Controllers/controllerQuest');
const controllerSubCategory = require('../Controllers/controllerSubCategory');
const controllerUsers = require("../Controllers/controllerUsers")
const controllerCities = require("../Controllers/controllerCities")
const auth = require("../middleware/auth")

router.post("/createUser", controllerUsers.createUser)
router.post("/login", controllerUsers.connect)
router.put("/updateUser", auth, controllerUsers.updateUserByUser)
router.delete("/deleteUser", auth, controllerUsers.deleteUser)
router.get("/getAllUsers", auth, controllerUsers.getAllUsers)
router.get("/userData", auth, controllerUsers.userData)

router.post("/createQuest", auth, controllerQuest.createQuest)
router.put("/updateQuest", auth, controllerQuest.updateQuest)
router.delete("/deleteQuest", auth, controllerQuest.deleteQuest)
router.get("/getAllQuest", auth, controllerQuest.getAllQuest)

router.post("/createSubCat", controllerSubCategory.createSubCategory)
router.put("/updateSubCat", controllerSubCategory.updateSubCat)
router.delete("/deleteSubCat", controllerSubCategory.deleteSubCat)
router.get("/getAllSubCat", controllerSubCategory.getAllSubCat)

router.post("/createCat", controllerCategory.createCat)
router.put("/updateCat", controllerCategory.updateCat)
router.delete("/deleteCat", controllerCategory.deleteCat)
router.get("/getAllCat", controllerCategory.getAllCat)

router.post("/createCity", controllerCities.createCity)
router.put("/updateCity", controllerCities.updateCity)
router.delete("/deleteCity", controllerCities.deleteCity)
router.get("/getAllCities", controllerCities.getAllCities)



module.exports = router;