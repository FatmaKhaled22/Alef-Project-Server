const express = require('express');
const adminRouter = express.Router()
const authAdminController = require('../Controllers/authAdminController ');



adminRouter.post('/login', authAdminController.login)
adminRouter.post('/register', authAdminController.register)



// Export the router:
module.exports = adminRouter;

