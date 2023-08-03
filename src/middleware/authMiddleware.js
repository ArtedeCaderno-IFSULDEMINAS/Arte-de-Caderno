import jwt, {decode} from 'jsonwebtoken'

function authenticateTokenJwt (req,res,next) {
    const token = req.headers.authorization?.split(" ")[1];
    const secret = process.env.secret;

    if(!token){
        return res.status(401).json({message: 'Token not informed'});
    }

    try{
        jwt.verify(token,secret)
        const {userId,email,accessType} = decode(token);
        req.userId = userId;
        req.email = email;
        req.accessType = accessType;

        return next();
    } 
    catch(err){
            return res.status(401).json({message: 'Token authentication failure'});
        }
    
};

export default authenticateTokenJwt;