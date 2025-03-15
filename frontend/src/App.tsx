import { Routes, Route } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import DiscussionCreation from './pages/DiscussionCreation';
import AppLayout from './layouts/AppLayout';
import DiscussionDetails from './pages/DiscussionDetails';
import PageNotfound from './pages/PageNotFound';
import { AuthProvider } from './contexts/FakeAuthContext';
import Profile from './pages/Profile';

function App() {
	return (
		<>
			<AuthProvider>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route element={<AppLayout />}>
						<Route path='/' element={<Home />} />
						<Route path='/thread/create' element={<DiscussionCreation />} />
						<Route path='/thread/:id' element={<DiscussionDetails />} />
            <Route path='/profile' element={<Profile/>}/>
						<Route path='*' element={<PageNotfound />} />
					</Route>
				</Routes>
			</AuthProvider>
		</>
	);
}

export default App;
