import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import userRegister from "../../images/userRegister.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const PostData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/register`, {
        name,
        email,
        password,
        confirmPassword,
      });
      if(res && res.data.success ){
        alert(res.data.message)
        navigate("/login")
        
      }else{
        alert(res.data.message)
      }

    } catch (error) {
      console.log(error);
      alert(`Something went wrong : ${error}` );
    }
  };

  return (
    <>
      <section className="registration">
        <Container>
          <Row>
            <Col>
              <Form onSubmit={PostData} method="POST">
                <h2 style={{ textAlign: "center" }}>Registration</h2>
                <Form.Group className="mb-3" controlId="formGroupName">
                  <label>Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <label>Email address</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <label>Confirm Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit">Register</Button>
                <br />
                <br />
                <div>
                  <p>
                    Already Registered?{" "}
                    <span>
                      <a href="/login">Login</a>
                    </span>
                  </p>
                </div>
              </Form>
            </Col>
            <Col>
              <img src={userRegister} alt="User Registration" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
