const express = require('express')
const router = express.Router();
const {login,test,regiter} = require('../controller/Apicontroller')
const initapi =(app)=>{
    router.post("/login",login)
    router.post("/regiter",regiter)
    router.get("/test",test)
    return app.use("/api", router);
}

module.exports = initapi;