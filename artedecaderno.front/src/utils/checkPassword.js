import {throwToast} from 'src/utils/toast'

export const checkPassword = (auxPwd) => {
    const { pwd1, pwd2 } = auxPwd;
    if (pwd1 === pwd2) {
        return true;
    } else {
        throwToast.error("As senhas não são iguais")
        return false
    }
};