import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { DEFAULT_PROFILE_IMAGE_URL, NOTIFICATIONS } from '../utils/constants';

const Navbar = () => {
	const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  useEffect(()=>{
    if(!isAuthenticated) navigate("/login")
  }, [isAuthenticated, navigate])

	return (
		<div className='navbar bg-base-100 shadow-sm'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h16M4 18h7'
							/>
						</svg>
					</div>
				</div>
			</div>
			<div className='navbar-center'>
				<Link to='/' className='btn btn-ghost text-xl'>
					Research Discussion Forum
				</Link>
			</div>
			<div className='navbar-end gap-2'>
				<Link to='/thread/create'>
					<button className='btn btn-neutral'>Create Thread +</button>
				</Link>
				<div className="dropdown dropdown-end">
          <button tabIndex={0} className='btn btn-ghost btn-circle'>
            <div className='indicator'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                />
              </svg>
              {notifications.some(n => !n.isRead) && (
                <span className='badge badge-xs badge-primary indicator-item'></span>
              )}
            </div>
          </button>
          <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-72">
            <div className="p-2 border-b flex justify-between items-center">
              <h3 className="font-bold text-md">Notifications</h3>
            </div>
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications yet
              </div>
            ) : (
              <ul className="menu">
                {notifications.map(notification => (
                  <li key={notification.id}>
                    <a className="text-base-content">
                      {notification.message}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <div className="p-2 border-t text-center">
						{notifications.length > 0 && (
                <button 
                  className="btn btn-ghost btn-xs"
                  onClick={() => setNotifications([])}
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
				<Link to="/profile" className='font-bold hover:text-purple-500'>{user?.username}</Link>
				<div className='dropdown dropdown-end'>
					<div
						tabIndex={0}
						role='button'
						className='btn btn-ghost btn-circle avatar'
					>
						<div className='w-10 rounded-full'>
							<img alt='Tailwind CSS Navbar component' src={user?.avatar_url ?? DEFAULT_PROFILE_IMAGE_URL} />
						</div>
					</div>
					<ul
						tabIndex={0}
						className='menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
					>
						<li>
							<Link to='/profile' className='justify-between'>
								Profile
							</Link>
						</li>
						<li>
							<a onClick={logout}>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
