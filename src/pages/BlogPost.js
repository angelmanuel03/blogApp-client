import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function BlogPost(){
	const notyf = new Notyf();
	const navigate = useNavigate();
	const [post, setPost] = useState([]);

	const fetchGetAllPost = () => {

        fetch("https://blogapi-server.onrender.com/blogs/getAllPost", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
            	// console.log(data)
            	// console.log(data.Blogs)

                if (data.Blogs) {
                    setPost(data.Blogs);
                } else if (data.message === 'No blog found'){
                	notyf.error('No blog found');
                }else {
                    notyf.error("Failed to Load");
                }
            })
            .catch(error => {
                notyf.error(error)
            });
    };

    useEffect(() => {
    	fetchGetAllPost();
    }, []);

	return (
		<>
		<div className="header-section text-center mt-5">
            <h1>Blog Post</h1>
        </div>

		    <Container className="card-container text-center mt-5">
		        <Row className="justify-content-center">
		            {post.length > 0 ? (
		                post.map((result, index) => (
		                    <Col key={index} sm={12} md={6} lg={4}>
		                        <Card className="mb-4 shadow-sm">
		                            <Card.Img
		                                variant="top"
		                                src={result.image || "https://img.freepik.com/free-photo/tablet-which-you-can-read-blog_1134-226.jpg?t=st=1734447776~exp=1734451376~hmac=34c0f23610ed08fe08f2ea7278b90c5a5f9acb296b2c08de5dbac9aca53fb5fa&w=740"}
		                                alt={result.title}
		                                className="card-img-top"
		                            />
		                            <Card.Body>
		                                <Card.Title className="card-title">{result.title}</Card.Title>
		                                <Button
		                                    variant="primary"
		                                    size="lg"
		                                    as={Link}
		                                    to={`/viewPost/${result._id}`}
		                                >
		                                    Details
		                                </Button>
		                            </Card.Body>
		                        </Card>
		                    </Col>
		                ))
		            ) : (
		                <p>No Blog Post found</p>
		            )}
		        </Row>
		    </Container>
		</>
		)
}