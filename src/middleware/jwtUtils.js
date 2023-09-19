import jwt from 'jsonwebtoken'

const generateToken = (payload) => {
    let secret = process.env.secret;
    const token = jwt.sign(payload,secret, { expiresIn: 7776000 });//90 dias token mudar depois
    return token;
};

export default generateToken;