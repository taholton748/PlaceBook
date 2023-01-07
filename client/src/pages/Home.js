import logo from '../components/Images/PlaceBook.png';
import '../App.css';

export default function Home() {
  return (
    <div className="homeBody">
      <h1 className="homeTextLeft">Where Travelers Connect and Share Their Journeys</h1>
      <img src={logo} alt="logo" className="App-logo" />
      <h1 className="homeTextCenter">Wanderlust Social Media</h1>
    </div>
  );
}
