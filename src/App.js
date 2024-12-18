import AppNavBar from './components/AppNavBar';
import ViewPost from './components/ViewPost'
import EditPost from './components/EditPost'
import DeletePost from './components/DeletePost'
import AddPost from './components/AddPost'


import Home from './pages/Home';
import Error from './pages/Error';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout'
import BlogPost from './pages/BlogPost'
import MyPost from './pages/MyPost'
import AdminDashboard from './pages/AdminDashboard'


import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import {useState, useEffect} from 'react';


function App() {
  const [user, setUser] = useState({
      id: null,
      isAdmin: null
    })

  function unsetUser(){
      localStorage.clear();
    }

  useEffect(()=> {
      
      if(localStorage.getItem('token')){
          fetch('https://blogapi-server.onrender.com/users/details', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => response.json())
          .then(data => {
              if(data._id === undefined){
                setUser({
                  id:null,
                  isAdmin: null
                })
              }else{
                setUser({
                  id: data._id,
                  isAdmin: data.isAdmin
                })
              }
          })

      }else{
        setUser({
          id: null,
          isAdmin: null

        })
        
      }

    }, [])

  return (
      <>
        <UserProvider value = {{user, setUser, unsetUser}}>
          <Router>
            <AppNavBar/>
            <Container>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="*" element={<Error />} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/login" element={<Login/>} />} />
                  <Route path="/logout" element={<Logout/>} />
                  <Route path="/getMyPost" element={<MyPost/>} />
                  <Route path="/addPost" element={<AddPost/>} />
                  <Route path="/BlogPost" element={<BlogPost/>} />
                  <Route path="/adminDashboard" element={<AdminDashboard/>} />
                  <Route path="/viewPost/:postId" element={<ViewPost/>} />
                  <Route path="/editPost/:postId" element={<EditPost/>} />
                  <Route path="/deletePost/:postId" element={<DeletePost/>} />
                  
              </Routes>
            </Container>
          </Router>
        </UserProvider>
      </>
    )
}

export default App;
