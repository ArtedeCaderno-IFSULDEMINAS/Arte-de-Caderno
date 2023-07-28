import Login from '../models/login.js';
import Professor from '../models/professor.js';
import Student from '../models/student.js';
import validateLogin from '../middleware/loginVerify.js';
import generateToken from '../middleware/jwtUtils.js';

class LoginController {

    listLogin = async (req, res, next) => {
        try{
            const logins = await Login.find().select('-password'); //removi o campo password por motivor de seguança
            res.status(200).json(logins);
        }
        catch(err){
            next(err);
        }
    }

    logar = async (req, res, next) => {
        const loginReq = new Login(req.body);
        try{
            const userLogin = await Login.findOne({username: loginReq.username});
            const verify = await validateLogin(userLogin.password,loginReq.password)

            if(verify){
                const tokenPayload = {loginId: userLogin._id,userName: userLogin.username,accessType: userLogin.accessType};
                const token = generateToken(tokenPayload);

                if("professor" === userLogin.accessType){
                    const professor = await this.getProfessorByLoginId(userLogin._id);
                    let response = {
                        accessType: 'professor',
                        user: professor,
                        token: token
                    };

                    return res.status(200).json(response);
                }
                if("student" === userLogin.accessType){
                    const student = await this.getStudentByLoginId(userLogin._id);

                    let response = {
                        accessType: 'student',
                        user: student,
                        token: token
                    };

                    return res.status(200).json(response);
                }
                
            }
            return res.status(400).json({message: 'Invalid password or username'});
        }
        catch(err){
            next(err);
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