const express = require('express')
const router = express.Router()
const validateBody = require('../../middlewares/validateBody')
const {schemas} = require('../../models/user')
const controllers =require('../../controllers/auth')
const authentificate = require('../../middlewares/authentificate')
const upload = require('../../middlewares/upload')

router.post("/register", validateBody(schemas.registerSchema), controllers.register)

router.post("/login",validateBody(schemas.loginSchema),controllers.login);

router.get("/current", authentificate, controllers.getCurrent);

router.post("/logout", authentificate, controllers.logout);

router.patch("/avatars", authentificate, upload.single('avatar'), controllers.updateAvatar)

router.get("/verify/:verificationCode", controllers.verifyEmail);

router.post("/verify", validateBody(schemas.emailSchema), controllers.resendVerifyEmail);

module.exports = router



// http://localhost:3002/api/auth/register
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2MyN2I4YzJjMzM5ZWI1YmVhYmQ2YyIsImlhdCI6MTcwMjYzNTYxNywiZXhwIjoxNzAyNzE4NDE3fQ.VyVUk49u99E9DWjeT5oLHj5E8cfJTr6mMjz_2Co_u2k

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M0OGMzNTdiNjk1MDgyMzA0YzU4NCIsImlhdCI6MTcwMjY0MzkyNiwiZXhwIjoxNzAyNzI2NzI2fQ.6D_KZf9hUhnWTquas5heq6XVVPOy6n62V-JNyEmni90