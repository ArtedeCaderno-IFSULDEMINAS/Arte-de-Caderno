const requiredFields = [
    'name',
    'cpf',
    'date_of_birth',
    'email',
    'password',
    'perfil',
    'cel',
    'cep',
    'rua',
    'bairro',
    'uf',
    'city',
    'numero'
]

function singUpValidation(inputs) {
    let errors = []
    requiredFields.forEach(field => {
        if (!inputs[field]) {
            errors.push('O campo ' + field.toUpperCase() + ' é obrigatório')
        }
    })
    return errors
}

export default singUpValidation