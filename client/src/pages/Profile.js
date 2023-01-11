import logo from '../components/Images/PlaceBook.png';
import '../App.css';

// import { useCurrentUserContext } from '../context/currentUser';

export default function Profile() {
  return (
    <div className="background">
      <div className="profile">
        <div className="card">
          <img src={logo} alt="logo" style={{ width: '40%' }} className="App-logo-small" />
          <h1>John Doe</h1>
          <p className="title">CEO & Founder, Example</p>
          <p>Harvard University</p>
        </div>
      </div>
      <div className="feed">
        <div className="card">
          <h1>feed</h1>
        </div>
      </div>
      <div className="friends">
        <div className="card">
          <h1>friends</h1>
        </div>
        <div className="card">
          <img src={logo} alt="logo" style={{ width: '20%' }} className="App-logo-small" />
          <h1>John Doe</h1>
          <p className="title">CEO & Founder, Example</p>
          <p>Harvard University</p>
        </div>
        <div className="card">
          <img src={logo} alt="logo" style={{ width: '20%' }} className="App-logo-small" />
          <h1>Jane Doe</h1>
          <p className="title">CEO & Founder, Example</p>
          <p>Harvard University</p>
        </div>
      </div>
    </div>
  );
}
