import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function DeletePost() {
  const { postId } = useParams(); // Get blog ID from URL params
  const navigate = useNavigate();
  const notyf = new Notyf();

  const deletePost = () => {

    fetch(`https://blogapi-server.onrender.com/blogs/deletePost/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          notyf.success('Blog deleted successfully');
          navigate(-1)
        } else {
          notyf.error('Error deleting blog');
        }
      })
      .catch(() => {
        notyf.error('Error deleting blog');
      })
  };

  return (
    <Container className="mt-5 text-center">
        <div>
          <h3>Are you sure you want to delete this blog?</h3>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="danger" onClick={deletePost}>
              Confirm
            </Button>
            <Button variant="secondary" className="ml-3" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </div>
    </Container>
  );
}