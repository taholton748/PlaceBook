import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../components/Images/PlaceBook.png';
import '../App.css';
import Feed from '../components/Feed';

export default function AutoLayoutExample() {
  return (
    <Container>
      <Row>
        <Col>
          <Row className="card">
            <img src={logo} alt="logo" style={{ width: '40%' }} className="App-logo-small" />
            <h1>John Doe</h1>
            <p className="title">CEO & Founder, Example</p>
            <p>Harvard University</p>
          </Row>
          <Row className="card">
            <img src={logo} alt="logo" style={{ width: '40%' }} className="App-logo-small" />
            <h1>Friends</h1>
            <p className="title">Friends Here</p>
          </Row>
        </Col>
        <Col className="card"><Feed /></Col>
      </Row>
    </Container>
  );
}
