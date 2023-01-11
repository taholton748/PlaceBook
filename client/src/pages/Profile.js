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
          <Row className="card">
            <img src={logo} alt="logo" style={{ width: '40%' }} className="App-logo-small" />
            <h1>John Doe</h1>
            <p className="title">CEO & Founder, Example</p>
            <p>Harvard University</p>
          </Row>
          <Row className="card">
            <h1>Friends</h1>
            <p className="title">Friends Here</p>
            <div className="event">
              <div className="label">
                <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" alt="prop" />
              </div>
              <div className="content">
                <div className="summary">
                  <a href="mailto:example@example.com" className="user">Elliot Fu</a>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="label">
                <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" alt="prop" />
              </div>
              <div className="content">
                <div className="summary">
                  <a href="mailto:example@example.com" className="user">Elliot Fu</a>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="label">
                <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" alt="prop" />
              </div>
              <div className="content">
                <div className="summary">
                  <a href="mailto:example@example.com" className="user">Elliot Fu</a>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="label">
                <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" alt="prop" />
              </div>
              <div className="content">
                <div className="summary">
                  <a href="mailto:example@example.com" className="user">Elliot Fu</a>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="label">
                <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" alt="prop" />
              </div>
              <div className="content">
                <div className="summary">
                  <a href="mailto:example@example.com" className="user">Elliot Fu</a>
                </div>
              </div>
            </div>
          </Row>
        </Col>
        <Col className="card"><Feed /></Col>
      </Row>
    </Container>
  );
}
