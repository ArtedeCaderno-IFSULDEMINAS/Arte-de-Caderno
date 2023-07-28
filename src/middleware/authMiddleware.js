import jwt, { decode } from 'jsonwebtoken'

function authenticateTokenJwt (req,res,next) {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message: 'Access denied'});
    }

    const secret = process.env.secret;
    jwt.verify(token,secret,(err,decoded) => {
       if(err){
        return res.status(401).json({message: 'Token authentication failure'});
       }
       req.user = decoded;
       return res.
       next();
    });

};

export default authenticateTokenJwt;