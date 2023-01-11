import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../components/Images/PlaceBook.png';
import Feed from '../components/Feed';
import '../App.css';

export default function AutoLayoutExample() {
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <img src={logo} alt="logo" style={{ width: '40%' }} className="App-logo-small" />
            <h1>John Doe</h1>
            <p className="title">CEO & Founder, Example</p>
            <p>Harvard University</p>
          </Row>
          <Row>Friends</Row>
        </Col>
        <Col><Feed /></Col>
      </Row>
    </Container>
  );
}
