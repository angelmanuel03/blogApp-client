import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Image } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function ViewPost() {
    const notyf = new Notyf();
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`https://blogapi-server.onrender.com/blogs/viewPost/${postId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch blog details');
            }
            return response.json();
        })
        .then((data) => {
            setPost(data);
        })
        .catch((error) => {
            console.error('Error fetching blog details:', error);
            notyf.error('Unable to fetch blog details. Please try again.');
        });
    }, [postId]);

    // Loading condition
    if (!post) {
        return (
            <Container>
                <Row>
                    <Col className="col-6 offset-3 mt-5 text-center">
                        <h3>Loading...</h3>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row>
                <Col xs={12} md={8} className="mx-auto">
                    <Card className="shadow-lg border-0">
                        {/* Blog Post Image */}
                        <Card.Img
                            variant="top"
                            src="https://img.freepik.com/free-photo/tablet-which-you-can-read-blog_1134-226.jpg?t=st=1734447776~exp=1734451376~hmac=34c0f23610ed08fe08f2ea7278b90c5a5f9acb296b2c08de5dbac9aca53fb5fa&w=740" // Sample image link
                            alt="Blog Post Image"
                        />
                        <Card.Body>
                            {/* Blog Title */}
                            <Card.Title as="h2" className="text-center mb-4">
                                {post.title}
                            </Card.Title>

                            {/* Blog Author and Date */}
                            <Card.Subtitle className="text-muted mb-3 text-center">
                                By <strong>{post.author}</strong> |{" "}
                                {new Date(post.creationDate).toLocaleDateString()}
                            </Card.Subtitle>

                            {/* Blog Content */}
                            <Card.Text className="lead" style={{ lineHeight: "1.8" }}>
                                {post.content}
                            </Card.Text>

                            {/* Blog Comments */}
                            <div className="mt-5">
                                <h4>Comments</h4>
                                <hr />
                                {post.comments && post.comments.length > 0 ? (
                                    post.comments.map((comment, index) => (
                                        <div key={index} className="mb-3">
                                            <strong>{comment.userId}:</strong>
                                            <p className="mb-1">{comment.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments yet. Be the first to comment!</p>
                                )}
                            </div>

                            {/* Navigation Button */}
                            <div className="text-center mt-4">
                                <Button variant="primary" onClick={() => navigate(-1)}>
                                    Back to Posts
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
