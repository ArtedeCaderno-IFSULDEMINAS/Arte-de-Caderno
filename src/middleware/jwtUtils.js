import jwt from 'jsonwebtoken'

const generateToken = (payload) => {
    let secret = process.env.secret;
    const token = jwt.sign(payload,secret, { expiresIn: 2419200 }); // tempo para durar um mes
    return token;
};

export default generateToken;