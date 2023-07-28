import jwt from 'jsonwebtoken'

const generateToken = (payload) => {
    let secret = process.env.secret;
    const token = jwt.sign(payload,secret); //,{ expiresIn: '1h' }
    return token;
};

export default generateToken;