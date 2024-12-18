import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function EditPost() {
  const { postId } = useParams(); // Get blog ID from URL params
  const navigate = useNavigate();
  const notyf = new Notyf();

  const [blog, setBlog] = useState(null); // For storing the full blog details
  const [title, setTitle] = useState(''); // Controlled state for blog title
  const [content, setContent] = useState(''); // Controlled state for blog content

  // Fetch the existing blog details
  const fetchViewPost = () => {
    fetch(`https://blogapi-server.onrender.com/blogs/viewPost/${postId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setBlog(data); // Store the blog details
          setTitle(data.title); // Populate the title input
          setContent(data.content); // Populate the content input
        } else {
          notyf.error('Blog not found');
        }
      })
      .catch(() => {
        notyf.error('Error fetching blog details');
      });
  };

  // Handle the form submission to edit the post
  const editPost = (e) => {
    e.preventDefault();

    if (!title || !content) {
      notyf.error('Please fill in both title and content.');
      return;
    }

    fetch(`https://blogapi-server.onrender.com/blogs/editPost/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          notyf.success('Blog updated successfully');
          navigate(-1);
        } else {
          notyf.error('Error updating blog');
        }
      })
      .catch(() => {
        notyf.error('Error updating blog');
      });
  };

  useEffect(() => {
    fetchViewPost(); // Fetch the blog details when the component mounts
  }, [postId]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Edit Blog Post</h2>

      {/* Form for Editing Blog Post */}
      <Form onSubmit={editPost}>
        {/* Blog Title Input */}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        {/* Blog Content Input */}
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter blog content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        {/* Buttons: Cancel and Submit */}
        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </Container>
  );
}
