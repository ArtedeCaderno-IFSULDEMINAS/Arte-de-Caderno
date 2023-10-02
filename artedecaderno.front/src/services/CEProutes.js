import { throwToast } from 'src/utils/toast';

export const CEProutes = {
    viacep: async function (cep) {
        const url = `http://localhost:8080/cep/${cep}`;
        const a = await fetch(url);
        const b = await a.json();

        if (b.erro) {
            throwToast.error("CEP incorreto!");
        } else if (!b.logradouro || !b.bairro) {
            throwToast.warning("Notamos que seu CEP não fornece dados de rua e bairro. Por favor, preencha manualmente!")
            return b
        } else {
            return b
        }
    }
}