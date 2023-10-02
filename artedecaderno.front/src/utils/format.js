export const format = {
    bday: function (v) {
        v = v.replace(/\D/g, "")
        v = v.substring(0, 8);
        v = v.replace(/(\d{2})(\d)/, "$1/$2")
        v = v.replace(/(\d{2})(\d{4})$/, "$1/$2")
        return v
    },
    cel: function (v) {
        v = v.replace(/\D/g, "")
        v = v.substring(0, 11);
        v = v.replace(/(\d{2})(\d)/, "($1) $2")
        v = v.replace(/(\d{5})(\d{4})$/, "$1-$2")
        return v
    },
    cep: function (v) {
        v = v.replace(/\D/g, "")
        v = v.substring(0, 8);
        v = v.replace(/(\d{5})(\d{3})$/, "$1-$2")
        return v
    },
    cpf: function (v) {
        v = v.replace(/\D/g, "")
        v = v.substring(0, 11);
        v = v.replace(/(\d{3})(\d)/, "$1.$2")
        v = v.replace(/(\d{3})(\d)/, "$1.$2")
        v = v.replace(/(\d{3})(\d{2})$/, "$1-$2")
        return v
    },
    inep: function (v) {
        v = v.replace(/\D/g, "")
        v = v.substring(0, 8)
        return v
    },
    phone: function (v) {
        v = v.replace(/\D/g, "")
        v = v.substring(0, 10);
        v = v.replace(/(\d{2})(\d)/, "($1) $2")
        v = v.replace(/(\d{4})(\d{4})$/, "$1-$2")
        return v
    },

}