import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../../context/currentUser';
import Search from '../Search';
import '../../App.css';

export default function Navigation() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  return (
    <nav>
      {isLoggedIn() ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <button type="button" onClick={logoutUser}>Logout</button>
          <Search className="search-bar" />
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
}
