import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckAuth from './components/CheckAuth';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SigninModal from './pages/SigninPage';
import SignupModal from './pages/SignupPage';

const AppRoutes = () => {
	const routes = useRoutes([
		{ path: "*", element: < NotFound /> },
		{ path: '/', element: <Home /> },
		{ path: '/sign-in', element: <SigninModal /> },
		{ path: '/sign-up', element: <SignupModal /> },
	])

	return routes;
}

function App() {
	return (
		<CheckAuth>
			<Router>
				<AppRoutes />
				<ToastContainer />
			</Router>
		</CheckAuth>
	);
}

export default App;
