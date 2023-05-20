import React, { useState, useEffect } from "react";
import { Container, Card, Col, Button, Modal, Row } from "react-bootstrap";
import {Link ,useNavigate } from "react-router-dom"
import axios from "axios";

const ViewScholarships = () => {
  
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState([]);

  // Get function
  const getScholarships = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/get-scholarships`
      );
      setScholarship(data.scholarship);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getScholarships();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async() => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/get-scholarships/${scholarship[selected]?._id}`
      );
      alert(data.message);
      navigate("/adminDashboard");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  // const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);
  // const [data, setData] = useState(data)
  const [selected, setSelected] = useState(null);
  const handleButtonClick = (index) => {
    setSelected(index);
    setShowModal(true);
  };

  

  // const [scholarshipName , setScholarshipName] = useState("");
  return (
    <>
      <Container>
        <br/><br/>
        {/* <h1>Scholarships: </h1> */}
        <Row>
          {scholarship?.map((item, index) => (
            <Col sm={12} md={4} style={{ padding: "20px" }}>
              <Card style={{ padding: "20px"} } key={item._id}>
                <h3>{item.scholarshipName}</h3>
                <br />
                <p>Deadline: {item.deadline}</p>
                {/* <p>Last Date to Update: {item.lastDateUpdate}</p> */}
                <p>Amount: {item.amount}</p>
                <Button
                  key={(item._id)}
                  onClick={() => handleButtonClick(index)}
                >
                  View More
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{scholarship[selected]?.scholarshipName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={3} className="modal-label">
                Deadline:
              </Col>
              <Col sm={9}>{scholarship[selected]?.deadline}</Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Amount:
              </Col>
              <Col sm={9}>{scholarship[selected]?.amount}</Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Category:
              </Col>
              <Col sm={9}>{scholarship[selected]?.category}</Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Eligibility:
              </Col>
              <Col sm={9}>{scholarship[selected]?.eligibility}</Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Documents Required:
              </Col>
              <Col sm={9}>{scholarship[selected]?.documents}</Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Note:
              </Col>
              <Col sm={9}>{scholarship[selected]?.description}</Col>
            </Row>
            <br />
          </Container>
          {/* <p>Deadline: {data[selected]?.deadline}</p>
          <p>Last Date to Update Details: {data[selected]?.lastDateUpdate}</p>
          <p>Amount: {data[selected]?.amount}</p>
          <p>Eligibility: {data[selected]?.eligibility}</p>
          <p>Documents Required: {data[selected]?.DocumentsRequired}</p> */}
        </Modal.Body>
        <Modal.Footer>
          <Link to={`/update-scholarship/${scholarship[selected]?._id}`}>
            <Button variant="primary" >Update</Button>
          </Link>
          <Button variant="danger"  onClick={handleShow}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
        <Modal.Title>{scholarship[selected]?.scholarshipName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure You want to delete this Scholarship?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </>
  );
};

export default ViewScholarships;
