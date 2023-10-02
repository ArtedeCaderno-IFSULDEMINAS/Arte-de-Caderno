import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ Component }) => {
    const isLogged = Cookies.get('isLogged')
    return (
        isLogged ? <Component /> : <Navigate to={"/login"} replace />
    )
}

export default ProtectedRoute