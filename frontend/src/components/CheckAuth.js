import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signinJWT } from "../store/reducers/user";
import Loader from "./shared/Loader";

export default function CheckAuth({ children }) {
	const dispatch = useDispatch();

	const [authChecking, setAuthChecking] = useState(true)

	useEffect(() => {
		dispatch(signinJWT())
			.then(() => {
				setAuthChecking(false)
			})
	}, [dispatch])

	return (
		authChecking ? <Loader /> : children
	)
}