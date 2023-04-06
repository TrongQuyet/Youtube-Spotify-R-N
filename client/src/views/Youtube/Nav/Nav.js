import { useState,React,useEffect } from "react";
import { FaUser,FaSearch } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-simple-keyboard/build/css/index.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import logo from './youtube.png';
import '../scss/Nav.scss'
import axios from 'axios';
const Nav = (props) => {
  const [renderCount, setRenderCount] = useState(0);
  const[loi,setloi] = useState('')
  const [showlogout, setShowlogout] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setavatar] = useState('');
  const[email,setemail] = useState('')
  const[username,setusername] = useState('')
  const[password,setpassword] = useState('')
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);
  let handleClose1 = () => setShow1(false);
  let handleShow1 = () => setShow1(true);
  const [query,setquery] = useState('')
  //xử lý search
  let search =()=>{
    // if(isLoggedIn===true){
    //   props.handlesearch(query)
    //   props.setisshow(false)
    // }
    props.handlesearch(query)
      props.setisshow(false)

}
//kiểm tra đăng nhập
const clickhome=()=> {
  props.setisshow(true)
}
//xử lý nhấn enter search
const something=(event)=> {
  if (event.keyCode === 13) {
    search()
  }
}
//các toast 
const success = () => toast.success("Đăng nhập thành công");
const error1 = () => toast.error("Kiểm tra tài khoản hoặc mật khẩu");
const successregiter = () => toast.success("Chúc mừng bạn đăng ký thành công");
const errregiter = () => toast.error(loi);
//xử lý khi lỗi đăng ký
useEffect(() => {
  if (renderCount > 0) {
    errregiter();
  } else {
    setRenderCount(renderCount + 1);
  }
}, [loi]);
// xử lý đăng nhập
const handleSubmit = async(event) => {
  event.preventDefault();
  // Do something with the avatar and password
  console.log(`avatar: ${username}, Password: ${password}`);
  // Clear the input fields
  await axios.post('http://localhost:8080/api/login', {
    username: username,
    password: password,
  })
  .then((response) => {
    console.log(`Dang nhap thanh cong , xin chao ${username}`);
    setShow(false);
    setavatar(username);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
    success()
    props.setIsLoggedIn(true)
    // Xử lý khi đăng nhập thành công
  })
  .catch((error) => {
    console.error(error.response.data);
    error1()
    // Xử lý khi đăng nhập thất bại
  });

};
// xử lý đăng xuất
const logout = ()=> {
  setShowlogout(true);
}
const handlelogout = ()=> {
   setIsLoggedIn(false);
  localStorage.removeItem('isLoggedIn');
  setShowlogout(false);
  props.setIsLoggedIn(false)
}
//xử lý đăng ký
const regiter=async()=> {
  await axios.post('http://localhost:8080/api/regiter', {
    username: username,
    password: password,
    email:email,
  })
  .then((response) => {
    successregiter()
    handleShow()
    handleClose1()

    // Xử lý khi đăng nhập thành công
  })
  .catch((error) => {
    console.error(error.response.data);
    setloi(error.response.data.message);
    // Xử lý khi đăng nhập thất bại
  });
  console.log(email,username,password)
}

  return (
    <>
     <Modal show={showlogout} onHide={() => setShowlogout(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận đăng xuất</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn đăng xuất?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowlogout(false)}>
              Không
            </Button>
            <Button variant="primary" onClick={handlelogout}>
              Có
            </Button>
          </Modal.Footer>
        </Modal>
    <ToastContainer/>
    <Modal  show={show1} onHide={handleClose1}>
    <Modal.Header closeButton>
      <Modal.Title>Đăng kí</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            autoFocus
            value={email} onChange={(event)=>setemail(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Account</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            autoFocus
            value={username} onChange={(event)=>setusername(event.target.value)}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="your password" value={password} onChange={(event)=>setpassword(event.target.value)}/>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={regiter}>
        Đăng ký
      </Button>
    </Modal.Footer>
    </Modal>
    <Modal  show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Đăng Nhập</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Account</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            autoFocus
            value={username} onChange={(event)=>setusername(event.target.value)}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="your password" value={password} onChange={(event)=>setpassword(event.target.value)}/>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
    bạn chưa có tài khoản?
      <Button variant="secondary" onClick={()=>{handleClose();handleShow1();}}>
        register
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        login
      </Button>
    </Modal.Footer>
    </Modal>
            <div className="nav-container">
        <div className="nav-left col-md2">
          <span className="logo-box" onClick={clickhome}><img src={logo} alt="Logo" className="logo-youtube"/>	&nbsp;YOUTUBE</span>
        </div>
        <div className="nav-midde ">
        <input className="input-search"   value={query} onKeyDown={(e) => something(e) } onChange={(event) =>setquery(event.target.value)} ></input>
        <FaSearch className="icon-search" onClick={search}/>
        </div>
        <div className="nav-right">
        {avatar && isLoggedIn  ? (
        <div className="user-login">
          <span>Welcome, {avatar}</span>
          <button onClick={logout}>đăng xuất</button>
        </div>
      ) : (
        <Button variant="primary" onClick={handleShow} >
          <FaUser/>
          </Button>
      )}
        </div>
      </div>
    </>
  );
};

export default Nav;
