const { throwToast } = require("./toast");

export const checkImage = (img) => {
    if(img.type.startsWith('image/') && !img.type.endsWith('gif') ){
        return true;
    } else {
        throwToast("Atenção! Apenas imagens são permitidas.")
        return false
    }
}