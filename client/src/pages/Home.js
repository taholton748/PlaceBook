import logo from '../components/Images/PlaceBook.png';
import '../App.css';

export default function Home() {
  return (
    <div className="homeBody">
      <h1 className="homeTextLeft">Where Travelers Connect and Share Their Journeys</h1>
      <p className="top-quote">Not all those who wander are lost</p>
      <img src={logo} alt="logo" className="App-logo" />
      <p className="bottom-quote">Jobs fill your pockets, adventures fill your soul</p>
      <h1 className="homeTextCenter">Wanderlust Social Media</h1>
    </div>
  );
}
