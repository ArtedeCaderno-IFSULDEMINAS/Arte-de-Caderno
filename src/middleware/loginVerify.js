import { scryptSync, randomBytes, timingSafeEqual } from 'crypto'

async function validateLogin(hash,passwordReq){
    const [salt,hashPasswordBD] = hash.split(':');
    const newHash = scryptSync(passwordReq,salt,64).toString('hex');   
    const match = timingSafeEqual(Buffer.from(newHash),Buffer.from(hashPasswordBD));
    
    return match;
}

export default validateLogin;