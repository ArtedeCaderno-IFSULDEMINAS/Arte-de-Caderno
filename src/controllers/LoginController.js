import Login from '../models/login.js';
import Professor from '../models/professor.js';
import Student from '../models/student.js';

class LoginController {

     listLogin = async (req, res) => {
        try{
            const logins = await Login.find();
            res.status(200).json(logins);
        }
        catch(err){
            res.status(500).json({message: err.message});
        }
    }

    logar = async (req, res) => {
        const {username, password} = req.body;
        if(username === null || password === null){
            return res.status(400).json({message: 'Username or password cannot be null'});
        }
        try{
            const userLogin = await Login.findOne({username: username});
            if(userLogin === null){
                return res.status(400).json({message: 'User not found'});
            }

            if(userLogin.password === password){
                if("professor" === userLogin.accessType){
                    const professor = await this.getProfessorByLoginId(userLogin._id);
                    return res.status(200).json(professor);
                }
                if("student" === accessType){
                    const student = await this.getStudentByLoginId(userLogin._id);
                    return res.status(200).json(student);
                }
                
            }
            return res.status(400).json({message: 'Wrong password'});
        }
        catch(err){
            res.status(500).json({message: err.message});
        }
    }

    getProfessorByLoginId = async (loginId) => {
        try{
            const professor = await Professor.findOne({loginId: loginId});
            if(professor === null){
                return null;
            }
            return professor;
        }
        catch(err){
            return null;
        }
    }

    getStudentByLoginId = async (loginId) => {
        try{
            const student = await Student.findOne({loginId: loginId});
            if(student === null){
                return null;
            }
            return student;
        }
        catch(err){
            return null;
        }
    }

}

export default new LoginController;