import User from '../models/user.js';

class UserController {

     listUser = async (req, res) => {
        try{
            const users = await User.find();
            res.status(200).json(users);
        }
        catch(err){
            res.status(500).json({message: err.message});
        }
    }

    insertUser = async (req, res) => {
        const {username, password} = req.body;
        if(username === null || password === null){
            return res.status(400).json({message: 'Username or password cannot be null'});
        }
        const user = new User({
            username: username,
            password: password
        });
        try{
            const newUser = await user.save();
            res.status(201).json(newUser);
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
    }
}

export default new UserController;