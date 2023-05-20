import React, { useState , useContext} from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import userLogin from "../../images/userLogin.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/auth";

const Login = () => {

  const { loggedIn,
    setLoggedIn,
    user,
    setUser,
    adminLoggedIn,
    setAdminLoggedIn, } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        alert(res.data.message);
        navigate("/scholarships");
        setLoggedIn(true);
        setAdminLoggedIn(false);
        setUser({user: res.data.email });
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("adminLoggedIn", true);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("email", email);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      // alert(res.data.message)
      console.log(error);
      alert(`Something went wrong `);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <img src={userLogin} alt="User Login" />
          </Col>
          <Col>
            <Form onSubmit={PostData} method="POST">
              <h2 style={{ textAlign: "center" }}>Login</h2>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                  className="form-control"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <input
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  required
                  className="form-control"
                />
              </Form.Group>
              <Button type="submit">LOGIN</Button> <span> or </span>
              <a href="/register">
                <Button variant="outline-primary">Register</Button>
              </a>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
