import { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function Home() {
    const { user } = useContext(UserContext);

    return (
        <Container>
            <Row className="text-center">
                <Col>
                    <h1 className="mt-5">Welcome to BlogGAG!</h1>

                    {user.id ? (
                        <Link to="/BlogPost" className="btn btn-primary mt-5">
                            View our Blogs
                        </Link>
                    ) : (
                        <Link to="/login" className="btn btn-primary mt-5">
                            Login to view our Blogs!
                        </Link>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
