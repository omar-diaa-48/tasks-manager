import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function AuthRoute({ userRolesId, children }) {
	const user = useSelector(({ user }) => user.data)

	return (
		user ? <>{children}</> : <Navigate to="/" replace />
	)
}

AuthRoute.defaultProps = {
	userRolesId: []
}