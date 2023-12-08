const express = require('express')
const router = express.Router()
const validateBody = require('../../middlewares/validateBody')
const {schemas} = require('../../models/user')
const controllers =require('../../controllers/auth');
const authentificate = require('../../middlewares/authentificate')

router.post("/register", validateBody(schemas.registerSchema), controllers.register)

router.post("/login",validateBody(schemas.loginSchema),controllers.login);

router.get("/current", authentificate, controllers.getCurrent);

router.post("/logout",authentificate, controllers.logout);

module.exports = router


// http://localhost:3002/api/auth/register