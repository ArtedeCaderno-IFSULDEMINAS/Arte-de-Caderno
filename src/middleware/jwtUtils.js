import jwt from 'jsonwebtoken'

const generateToken = (payload) => {
    let secret = process.env.secret;
    const token = jwt.sign(payload,secret, { expiresIn: 86400 });
    return token;
};

export default generateToken;