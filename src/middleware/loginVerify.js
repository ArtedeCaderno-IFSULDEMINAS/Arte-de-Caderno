import { scryptSync, randomBytes, timingSafeEqual } from 'crypto'

function validateLogin(hash,passwordReq){
    const [salt,hashPasswordBD] = hash.split(':');
    const newHash = scryptSync(passwordReq,salt,64).toString('hex');   
    const match = timingSafeEqual(Buffer.from(newHash),Buffer.from(hashPasswordBD));
    
    if(match)
        return true;
    else
        return false;    
}

export default validateLogin;