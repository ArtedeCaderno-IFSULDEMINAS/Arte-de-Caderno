import Login from '../models/login.js';
import Professor from '../models/professor.js';
import Student from '../models/student.js';
import validateLogin from '../middleware/loginVerify.js';
import generateToken from '../middleware/jwtUtils.js';
import transporter from '../middleware/emailConfig.js';
import crypto from 'crypto';

class LoginController {

    listLogin = async (req, res, next) => {
        try{
            const logins = await Login.find().select('-password'); 
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
                    const professorRecord = await this.getProfessorByLoginId(userLogin._id);
                    
                    async function sendEmail() {
                        const code = crypto.randomBytes(4).toString('hex');
                        professorRecord.code2factor = code;
                        const codeGeneratedAt = new Date();
                        professorRecord.createdAt = codeGeneratedAt;
                        
                        const filter = {_id: professorRecord._id}; //filtrar por ID para atualizar
                        const updateCode = {code2factor: professorRecord.code2factor}; //modificar o codigo de 2 fatores
                        const updateTime = {createdAt: professorRecord.createdAt}; //modificar a data salva
                        await Professor.findOneAndUpdate(filter,updateCode); //realizar o update no banco campo codigo
                        await Professor.findOneAndUpdate(filter,updateTime); //realizar o update no banco campo time
                    
                        const mailSent = await transporter.sendMail({
                            //text: `Seu código de verificação é:  ${code}`,
                            subject: 'Código de Autenticação Arte de Caderno',
                            from: 'Equipe Arte de Caderno <artedecaderno.if@gmail.com>',
                            to: professorRecord.email,
                            html: `<p>Seu código de autenticação é:</p>
                            <p style="color: tomato; font-size: 25px; letter-spacing: 2px;">
                              <b>${code}</b>
                            </p>
                            <p><b>Código expira em 10 minutos</b>.</p>`
                            
                        });   
                        //console.log(mailSent);
                    }
                    sendEmail();

                    return res.status(200).json({message: '2-factor code sent to registered email'});
                }
                if("student" === userLogin.accessType){
                    const studentRecord = await this.getStudentByLoginId(userLogin._id);
                    
                    async function sendEmail() {
                        const code = crypto.randomBytes(4).toString('hex');
                        studentRecord.code2factor = code;
                        const codeGeneratedAt = new Date();
                        studentRecord.createdAt = codeGeneratedAt;
                        
                        const filter = {_id: studentRecord._id}; //filtrar por ID para atualizar
                        const updateCode = {code2factor: studentRecord.code2factor}; //modificar o codigo de 2 fatores
                        const updateTime = {createdAt: studentRecord.createdAt}; //modificar a data salva
                        await Student.findOneAndUpdate(filter,updateCode); //realizar o update no banco campo codigo
                        await Student.findOneAndUpdate(filter,updateTime); //realizar o update no banco campo time
                                    
                        const mailSent = await transporter.sendMail({
                            //text: `Seu código de verificação é:  ${code}`,
                            subject: 'Código de Autenticação Arte de Caderno', //remover estudante depois, apenas para teste
                            from: 'Equipe Arte de Caderno <artedecaderno.if@gmail.com>',
                            to: studentRecord.email,
                            html: `<p>Seu código de autenticação é:</p>
                            <p style="color: tomato; font-size: 25px; letter-spacing: 2px;">
                              <b>${code}</b>
                            </p>
                            <p><b>Código expira em 10 minutos</b>.</p>`
                            
                        });   
                        //console.log(mailSent);
                    }
                    sendEmail();

                    return res.status(200).json({message: '2-factor code sent to registered email'});
                }
                
            }
            return res.status(400).json({message: 'Invalid password or username'});
        }
        catch(err){
            next(err);
        }
    }

    Login2FAConfirmed = async (req, res, next) => {
        const loginReq = new Login(req.body);
        try{
            const userLogin = await Login.findOne({username: loginReq.username});
            const verify = await validateLogin(userLogin.password,loginReq.password,loginReq.code)

            if(verify){

                if("professor" === userLogin.accessType){
                    const professor = await this.getProfessorByLoginId(userLogin._id);

                    const tokenPayload = {
                        userId: professor._id,
                        userName: userLogin.username,
                        email: professor.email,
                        accessType: userLogin.accessType,
                    };
                    const token = generateToken(tokenPayload);

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
                    const token = generateToken(tokenPayload);

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