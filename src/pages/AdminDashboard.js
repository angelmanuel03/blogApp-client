import { useState, useEffect, useContext } from 'react'; // Added useContext
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function AdminDashboard() {
    const { user } = useContext(UserContext); // useContext is now properly imported

    const notyf = new Notyf();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const fetchGetAllPost = () => {
        fetch("https://blogapi-server.onrender.com/blogs/getAllPost", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.Blogs) {
                    setPosts(data.Blogs);
                } else if (data.message === 'No blog found') {
                    notyf.error('No blog found');
                } else {
                    notyf.error("Failed to Load");
                }
            })
            .catch(error => {
                notyf.error(error.message);
            });
    };

    useEffect(() => {
        fetchGetAllPost();
    }, []);

    return (
        user.isAdmin !== true ? (
            <Navigate to="/" />
        ) : (
            <Container>
                <h1 className="text-center mt-5">Blog Posts</h1>
                <Table striped bordered hover className="mt-5">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author</th>
                            <th>Creation Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post._id}>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>{post.author}</td>
                                <td>{new Date(post.creationDate).toLocaleDateString()}</td>
                                <td>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        as={Link}
                                        to={`/editPost/${post._id}`}
                                    >
                                        Edit
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        as={Link}
                                        to={`/deletePost/${post._id}`}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        )
    );
}
