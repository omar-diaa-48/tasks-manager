import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
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
		<Router>
			<AppRoutes />
		</Router>
	);
}

export default App;
