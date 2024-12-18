import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function AddPost() {
    const notyf = new Notyf();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const addPost = (e) => {
        e.preventDefault();

        fetch(`https://blogapi-server.onrender.com/blogs/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                title,
                content
            })
        })
            .then((res) => res.json())
            .then((data) => {
            	console.log(data)
                if (data) {
                    notyf.success('Blog added successfully');
                    navigate(-1); // Navigate back to the previous page
                } else if (data.message === 'Blog already exists') {
                    notyf.error('Blog already exists');
                } else {
                    notyf.error('Error adding blog');
                }
            })
            .catch(() => {
                notyf.error('Error adding blog');
            });
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center">Add New Blog Post</h1>
            <Form onSubmit={addPost} className="mt-4">
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter post content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Confirm
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
