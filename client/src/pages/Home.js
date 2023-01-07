import logo from '../components/Images/PlaceBook.png';
import '../App.css';

export default function Home() {
  return (
    <div style={{ backgroundImage: 'url(./components/Images/home-background.jpeg)' }}>
      <h2 className="homeTitle">Where Travelers Connect and Share</h2>
      <img src={logo} alt="logo" className="App-logo" />
    </div>
  );
}
