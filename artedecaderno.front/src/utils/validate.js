import { throwToast } from "./toast"

export const validateDate = (date) => {
    const splitted = date.split('/')
    const day = splitted[0]
    const month = splitted[1] - 1
    const year = splitted[2]
    const currentYear = new Date().getFullYear()

    let maxDay = 0;

    if (year > currentYear || year <= 0 || (currentYear - year) > 100) {
        throwToast.error("Data inválida!")
        return false
    } else {
        if (month > 12 || month <= 0) {
            throwToast.error("Data inválida!")
            return false
        } else {
            switch (parseInt(month)) {
                // meses com 31 dias
                case month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12:
                    maxDay = 31
                    break;

                case month === 1:
                    if (checkLeap(year)) {
                        maxDay = 29
                        break;
                    } else {
                        maxDay = 28
                        break;
                    }

                // meses com 30 dias
                case month === 4 || month === 6 || month === 9 || month === 11:
                    maxDay = 30
                    break;

                default:
                    break;
            }
            if (day > 31) {
                throwToast.error("Data inválida!")
                return false
            } else {
                if (day > maxDay || day <= 0) {
                    throwToast.error("Data inválida!")
                    return false
                } else {
                    return true
                }
            }
        }
    }

}

const checkLeap = (year) => {
    if (year % 4 !== 0 || year % 400 === 0) {
        return false
    } else {
        if (year % 100 !== 0) {
            return true
        } else {
            return false
        }
    }
}
