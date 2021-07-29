const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs")
    response.json(users);
})

usersRouter.post("/", async (request,response, next) => {
    try{const body = request.body;
    if(body.password.length < 3) {
        console.log("working");
        throw new Error('invalid User')
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    const savedUser = await user.save();

    response.json(savedUser);
}
catch (err){
    console.log(err.name, " this is the name");
    next(err);
}
})

module.exports = usersRouter