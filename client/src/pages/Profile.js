import logo from '../components/Images/PlaceBook.png';
import '../App.css';

// import { useCurrentUserContext } from '../context/currentUser';

export default function Profile() {
  return (
    <div className="background">
      <div className="container">
        <div className="row"/* I */>
          <div className="col-sm-3"/* profile */>
            <div className="card">
              <img src={logo} alt="logo" style={{ width: '40%' }} className="App-logo-small" />
              <h1>John Doe</h1>
              <p className="title">CEO & Founder, Example</p>
              <p>Harvard University</p>
            </div>
          </div>
          <div className="col-sm-6"/* feed */>
            <div className="card">
              <h1>feed</h1>
            </div>
          </div>
          <div className="col-sm-3"/* {friend} */>
            <div className="card">
              <h1>friends</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
