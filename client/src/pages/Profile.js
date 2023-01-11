import logo from '../components/Images/PlaceBook.png';
import '../App.css';
import Feed from '../components/Feed';

// import { useCurrentUserContext } from '../context/currentUser';

export default function Profile() {
  return (
    <div className="background">
      <div className="card">
        <img src={logo} alt="logo" style={{ width: '40%' }} className="App-logo-small" />
        <h1>John Doe</h1>
        <p className="title">CEO & Founder, Example</p>
        <p>Harvard University</p>
      </div>
      <Feed />
    </div>
  );
}
