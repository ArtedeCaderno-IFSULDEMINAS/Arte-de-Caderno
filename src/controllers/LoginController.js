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

    updatePassword = async (req, res) => {
        const {id, username, password, accessType} = req.body;
        if(id===null || accessType === null){
            return res.status(400).json({message: 'Id or accessType cannot be null'});
        }
        const login = await Login.findById(id);
        if(login === null){
            return res.status(400).json({message: 'User not found'});
        }
        login.username = username || login.username;
        login.password = password || login.password;

        if(login.accessType === 'professor'){
            const result = await ProfessorController.updateProfessorById(id, login.username, login.password);
            if(result === null){
                return res.status(400).json({message: 'Professor not found'});
            }
            if(result === 0){
                return res.status(400).json({message: 'Professor not updated'});
            }
            return res.status(200).json({message: 'Professor updated'});

        }
        else if(login.accessType === 'student'){
            const result = await StudentController.updateStudentById(id, login.username, login.password);
            if(result === null){
                return res.status(400).json({message: 'Student not found'});
            }
            if(result === 0){
                return res.status(400).json({message: 'Student not updated'});
            }
            return res.status(200).json({message: 'Student updated'});
        }

    }

}

export default new LoginController;