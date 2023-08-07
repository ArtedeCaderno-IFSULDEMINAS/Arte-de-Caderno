import Login from '../models/login.js';
import Professor from '../models/professor.js';
import Student from '../models/student.js';
import validateLogin from '../middleware/loginVerify.js';
import generateToken from '../middleware/jwtUtils.js';

class LoginController {

    listLogin = async (req, res, next) => {
        try{
            const logins = await Login.find().select('-password'); //I removed the password field for security reasons
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

                if("professor" === userLogin.accessType){
                    const professor = await this.getProfessorByLoginId(userLogin._id);

                    const tokenPayload = {
                        userId: professor._id,
                        userName: userLogin.username,
                        email: professor.email,
                        accessType: userLogin.accessType,
                    };
                    const token = await generateToken(tokenPayload);

                    let response = {
                        accessType: 'professor',
                        user: professor,
                        token: token,
                    };

                    return res.status(200).json(response);
                }
                if("student" === userLogin.accessType){
                    const student = await this.getStudentByLoginId(userLogin._id);
                    
                    const tokenPayload = {
                        userId: student._id,
                        userName: userLogin.username,
                        email: student.email,
                        accessType: userLogin.accessType,
                    };
                    const token = await generateToken(tokenPayload);

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