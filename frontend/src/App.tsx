import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/FakeAuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import DiscussionCreation from './pages/DiscussionCreation';
import AppLayout from './layouts/AppLayout';
import DiscussionDetails from './pages/DiscussionDetails';
import PageNotfound from './pages/PageNotFound';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

const App = () => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<Router basename='/discussion-forum-module'>
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route element={<AppLayout />}>
								<Route path='/' element={<Home />} />
								<Route path='/thread/create' element={<DiscussionCreation />} />
								<Route path='/thread/:id' element={<DiscussionDetails />} />
								<Route path='/profile' element={<Profile />} />
								<Route path='*' element={<PageNotfound />} />
							</Route>
						</Routes>
					</Router>
				</AuthProvider>
			</QueryClientProvider>
		</>
	);
};

export default App;
