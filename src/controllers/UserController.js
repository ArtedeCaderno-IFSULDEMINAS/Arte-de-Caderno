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
}

export default new UserController;