import Login from '../models/login.js';
import Professor from '../models/professor.js';
import Student from '../models/student.js';
import validateLogin from '../middleware/loginVerify.js';
import generateToken from '../middleware/jwtUtils.js';
import transporter from '../middleware/emailConfig.js';
import  crypto,{ timingSafeEqual } from 'crypto';
import createHashWithSalt from "../middleware/hashWithSalt.js";

class LoginController {

    listLogin = async (req, res, next) => {
        try {
            const logins = await Login.find().select('-password');
            res.status(200).json(logins);
        }
        catch (err) {
            next(err);
        }
    }

    logar = async (req, res, next) => {
        const loginReq = new Login(req.body);
        try {
            const userLogin = await Login.findOne({ username: loginReq.username });
            const verify = await validateLogin(userLogin.password, loginReq.password)

            if (verify) {

                if ("professor" === userLogin.accessType) {
                    //const professorRecord = await this.getProfessorByLoginId(userLogin._id);
                    const { email } = await this.getProfessorByLoginId(userLogin._id);
                    //const { email } = await this.getStudentByLoginId(userLogin._id);

                    async function sendEmail() {
                        const code = crypto.randomBytes(4).toString('hex').toUpperCase();
                        const codeGeneratedAt = new Date();

                        
                        const updateCode = { 
                            code2factor:  code, 
                            createdAt:codeGeneratedAt,
                            email:email
                         }; //modificar o codigo de 2 fatores

                        await Login.findOneAndUpdate({ username: loginReq.username }, updateCode); //realizar o update no banco campo codigo

                        const mailSent = await transporter.sendMail({
                            //text: `Seu código de verificação é:  ${code}`,
                            subject: 'Código de Autenticação Arte de Caderno',
                            from: 'Equipe Arte de Caderno <artedecaderno.if@gmail.com>',
                            to: email,
                            html: `<div style="position: relative;
                            width: 90vw;
                            max-width: 700px;
                            background: #404040;
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 2px;
                            padding: 20px;
                            text-align: center;
                            font-family: 'Raleway';">
                
                    <div style="width: 100%;
                                height: 0;
                                padding-bottom: 16.5%; /* Mantém a proporção da imagem (12.8/86 = 16.5%) */
                                position: relative;
                                background: url('https://i.imgur.com/MHJ4Oml.png') center/contain no-repeat;">
                
                    </div>
                
                    <div style="width: 100%;
                                font-weight: 800;
                                font-size: 6vw; /* Tamanho de fonte responsivo */
                                color: #FFFFFF;
                                margin-top: 20px;
                                border: 1px solid #000000;
                                text-shadow: 0px 0.2vw 0.2vw rgba(0, 0, 0, 0.25);">
                        ${code.toUpperCase()}
                    </div>
                
                    <div style="width: 100%;
                    background: #EFEFEF;
                    height: 0;
                    padding-bottom: 16.5%; /* Mantém a proporção da imagem (12.8/86 = 16.5%) */
                    position: relative;
                    font-size: 1.7vw; 
                    color: #000000;">
            Este é o seu código de verificação. Por favor, não compartilhe este código com mais ninguém. Ele é pessoal e válido por 10 minutos. Atenciosamente, Equipe Arte de Caderno
        </div>
        
                </div>`

                        });
                        //console.log(mailSent);
                    }
                    sendEmail();

                    return res.status(200).json({ message: '2-factor code sent to registered email' });
                }
                if ("student" === userLogin.accessType) {
                    const { email } = await this.getStudentByLoginId(userLogin._id);

                    async function sendEmail() {
                        const code = crypto.randomBytes(4).toString('hex').toUpperCase();
                        const codeGeneratedAt = new Date();

                        const updateCode = { 
                            code2factor: code,
                            createdAt: codeGeneratedAt,
                            //email:email
                        }; 

                        await Login.findOneAndUpdate({ username: userLogin.username}, updateCode);

                        const mailSent = await transporter.sendMail({
                            //text: `Seu código de verificação é:  ${code}`,
                            subject: 'Código de Autenticação Arte de Caderno', //remover estudante depois, apenas para teste
                            from: 'Equipe Arte de Caderno <artedecaderno.if@gmail.com>',
                            to: email,
                            html: `<div style="position: relative;
                            width: 90vw;
                            max-width: 700px;
                            background: #404040;
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 2px;
                            padding: 20px;
                            text-align: center;
                            font-family: 'Raleway';">
                
                    <div style="width: 100%;
                                height: 0;
                                padding-bottom: 16.5%; /* Mantém a proporção da imagem (12.8/86 = 16.5%) */
                                position: relative;
                                background: url('https://i.imgur.com/MHJ4Oml.png') center/contain no-repeat;">
                
                    </div>
                
                    <div style="width: 100%;
                                font-weight: 800;
                                font-size: 6vw; /* Tamanho de fonte responsivo */
                                color: #FFFFFF;
                                margin-top: 20px;
                                border: 1px solid #000000;
                                text-shadow: 0px 0.2vw 0.2vw rgba(0, 0, 0, 0.25);">
                        ${code.toUpperCase()}
                    </div>
                
                    <div style="width: 100%;
                    background: #EFEFEF;
                    height: 0;
                    padding-bottom: 16.5%; /* Mantém a proporção da imagem (12.8/86 = 16.5%) */
                    position: relative;
                    font-size: 1.7vw; 
                    color: #000000;">
            Este é o seu código de verificação. Por favor, não compartilhe este código com mais ninguém. Ele é pessoal e válido por 10 minutos. Atenciosamente, Equipe Arte de Caderno
        </div>
        
                </div>`

                        });
                        //console.log(mailSent);
                    }
                    sendEmail();

                    return res.status(200).json({ message: '2-factor code sent to registered email' });
                }

            }
            return res.status(400).json({ message: 'Invalid password or username' });
        }
        catch (err) {
            next(err);
        }
    }

    Login2FAConfirmed = async (req, res, next) => {
        const loginReq = new Login(req.body);
        try {
            const userLogin = await Login.findOne({ username: loginReq.username });

            const verify = await validateLogin(userLogin.password, loginReq.password);

            if (verify) {

                try {
                    if (timingSafeEqual(Buffer.from(userLogin.code2factor), Buffer.from(loginReq.code2factor))) {
                        
                        const currentDate = new Date();
                        const userDate = new Date(userLogin.createdAt);
                        userDate.setMinutes(userDate.getMinutes()+10);
                        if(!(currentDate <= userDate)){
                            return res.status(400).json({ message: 'Expired code' });
                        }
                    } else {
                        return res.status(400).json({ message: 'Invalid 2FA Code' });
                    }
                } catch (error) {
                    return res.status(400).json(error);
                }

                if ("professor" === userLogin.accessType) {
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
                if ("student" === userLogin.accessType) {
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
            return res.status(400).json({ message: 'Invalid password or username' });
        }
        catch (err) {
            next(err);
        }
    }

    getProfessorByLoginId = async (loginId) => {
        try {
            const professor = await Professor.findOne({ loginId: loginId });
            if (professor === null) {
                return null;
            }
            return professor;
        }
        catch (err) {
            return null;
        }
    }

    getStudentByLoginId = async (loginId) => {
        try {
            const student = await Student.findOne({ loginId: loginId });
            if (student === null) {
                return null;
            }
            return student;
        }
        catch (err) {
            return null;
        }
    }

    forgotPassword = async (req, res) => {
        const userReq = req.body.username;
        try {
            
                const user = await Login.findOne({ username: userReq });
            if(!user){
                return res.status(400).json({ message: 'error user not found' });
            }

            const tokenForgotPassword = crypto.randomBytes(20).toString('hex').toUpperCase();
            const now = new Date();
            now.setHours(now.getHours() + 1);

            await Login.findByIdAndUpdate(user._id, {
                '$set': {
                    tokenForgotPassword: tokenForgotPassword,
                    passwordResetExpires: now,
                }
            });
            //console.log(tokenForgotPassword,now);
            
            async function sendEmail() {
                const mailSent = await transporter.sendMail({
                    subject: 'Código para alterar senha Arte de Caderno',
                    from: 'Equipe Arte de Caderno <artedecaderno.if@gmail.com>',
                    to: user.email,
                    html: `<p>Seu código para alterar sua senha é:</p>
                    <p style="color: DarkMagenta; font-size: 25px; letter-spacing: 2px;">
                      <b>${tokenForgotPassword}</b>
                    </p>
                    <p><b>Código expira em 1 hora</b>.</p>`

                });
            }
            sendEmail();
            return res.status(200).json({ message: 'code sent to registered email' });
        } catch (error) {
            return res.status(400).json({ message: 'Erro on forgot password, try again'});
        }
    }

    resetPassword = async (req, res) => {
        const {username, token, password} = req.body;

        try {
            const user = await Login.findOne({ username }).select('+tokenForgotPassword passwordResetExpires');
            if(!user){
                return res.status(400).json({ message: 'error user not found' });
            }
            if(token !== user.tokenForgotPassword){
                return res.status(400).json({ message: 'Invalid Token'});
            }

            const now = Date();
            if(now > user.passwordResetExpires){
                return res.status(400).json({ message: 'Expired token, generate a new one'});
            }

            //encriptar nova senha antes de salvar
            const hashPassword = await createHashWithSalt(password);
            user.password = hashPassword;
            await user.save();

            return res.status(200).json({ message: 'password changed successfully' });

        } catch (error) {
            return res.status(400).json({ message: 'Cannot reset password, try again' + error});
        }
    }
}

export default new LoginController;