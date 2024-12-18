import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

export default function Error() {

    return (
    	<Container>
            <Row className="text-center">
                <Col>
                    <h1 className="mt-5">404 - Not Found</h1>
                    <Link to="/BlogPost" className="btn btn-primary mt-5">Back to Home</Link>
                </Col>
            </Row>
        </Container>
    )
}