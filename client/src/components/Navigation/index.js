import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../../context/currentUser';

export default function Navigation() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  return (
    <nav>
      {isLoggedIn() ? (
        <>
          <Link to="/landing">Dashboard</Link>
          <button type="button" onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
}
