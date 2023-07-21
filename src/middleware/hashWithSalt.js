import { scryptSync, randomBytes, timingSafeEqual } from 'crypto'

function createHashWithSalt(password){
    const salt = randomBytes(16).toString('hex');
    const passwordHash = scryptSync(password,salt,64).toString('hex');
    
    return `${salt}:${passwordHash}`;
}

export default createHashWithSalt;