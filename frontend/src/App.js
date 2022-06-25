import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthRoute from './components/AuthRoute';
import CheckAuth from './components/CheckAuth';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SigninModal from './pages/SigninPage';
import SignupModal from './pages/SignupPage';
import Task from './pages/Task';
import Tasks from './pages/Tasks';

const AppRoutes = () => {
	const routes = useRoutes([
		{ path: "*", element: < NotFound /> },
		{ path: '/', element: <Home /> },
		{ path: '/tasks/:taskId', element: <AuthRoute><Task /></AuthRoute> },
		{ path: '/tasks', element: <AuthRoute><Tasks /></AuthRoute> },
		{ path: '/sign-in', element: <SigninModal /> },
		{ path: '/sign-up', element: <SignupModal /> },
	])

	return routes;
}

function App() {
	return (
		<CheckAuth>
			<Router>
				<NavBar />
				<AppRoutes />
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</Router>
		</CheckAuth >
	);
}

export default App;
