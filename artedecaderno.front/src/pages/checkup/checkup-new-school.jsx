import { useEffect } from 'react'
import CheckupNewSchoolView from 'src/views/checkup/new-school';

const CheckupNewSchool = () => {
    useEffect(() => {
    document.title = "Arte de Caderno | Cadastrar Escola";
    }, []);
  return (
    <CheckupNewSchoolView/>
  )
}

export default CheckupNewSchool