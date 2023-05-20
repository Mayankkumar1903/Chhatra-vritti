import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Button,
  Modal,
  Row,
  Table,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const StudentDetails = () => {
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState([]);
  const [finalReason, setFinalReason] = useState();
  // Get function
  const getScholarships = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/get-applications`
      );
      setScholarship(data.application);
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

  const handleAccept = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/set-status/${scholarship[selected]?._id}`,
        { status: "Accepted" }
      );
      alert(data.message);
      navigate("/adminDashboard");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleReject = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/set-status/${scholarship[selected]?._id}`,
        { status: "Rejected"}
      );
      alert(data.message);
      // navigate("/adminDashboard");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);
  // const [data, setData] = useState(data)
  const [selected, setSelected] = useState(null);
  const handleButtonClick = (index) => {
    setSelected(index);
    setShowModal(true);
  };

  const [reasons, setReasons] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    if (reasons.includes(value)) {
      setReasons(reasons.filter((reason) => reason !== value));
    } else {
      setReasons([...reasons, value]);
    }
  };

  const handleTextAreaChange = (e) => {
    const selectedReasons = reasons.join(", ");
    const textAreaValue = `${e.target.value}\n\nSelected Reasons: ${selectedReasons}`;
    setFinalReason(textAreaValue);
    console.log(textAreaValue);
    console.log(e.target.value);
  };

  return (
    <>
      <Container>
        <Table responsive>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Scholarship Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scholarship?.map((item, index) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.scholarshipName}</td>
                <td>{item.category}</td>
                <td>{item.amount}</td>
                <td>
                  <Button onClick={() => handleButtonClick(index)}>
                    View More
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>{scholarship[selected]?.scholarshipName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col sm={2} className="modal-label">
                  Student Name:
                </Col>
                <Col sm={3}>{scholarship[selected]?.name}</Col>
                <Col sm={1} className="modal-label">
                  Email:
                </Col>
                <Col sm={3}>{scholarship[selected]?.email}</Col>
                <Col sm={1} className="modal-label">
                  Mobile:
                </Col>
                <Col sm={2}>{scholarship[selected]?.mobile}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={2} className="modal-label">
                  Amount:
                </Col>
                <Col sm={3}>{scholarship[selected]?.amount}</Col>
                <Col sm={1} className="modal-label">
                  Category:
                </Col>
                <Col sm={3}>{scholarship[selected]?.category}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={2} className="modal-label">
                  Bank Name:
                </Col>
                <Col
                  sm={4}
                >{`${scholarship[selected]?.bankName} , ${scholarship[selected]?.branch}`}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={2} className="modal-label">
                  Income:
                </Col>
                <Col sm={3}>{scholarship[selected]?.income}</Col>
                <Col sm={2} className="modal-label">
                  Income Proof:
                </Col>
                <Col sm={6}>{scholarship[selected]?.incomeProof}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={2} className="modal-label">
                  College Name:
                </Col>
                <Col sm={3}>{scholarship[selected]?.collegeName}</Col>
                <Col sm={1} className="modal-label">
                  UID:
                </Col>
                <Col sm={1}>{scholarship[selected]?.uid}</Col>
                <Col sm={2} className="modal-label">
                  College Email:
                </Col>
                <Col sm={3}>{scholarship[selected]?.collegeEmail}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">
                  Achievements:
                </Col>
                <Col sm={9}>{scholarship[selected]?.achievements}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">
                  Certificates:
                </Col>
                <Col sm={9}>{scholarship[selected]?.certificates}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">
                  LOR:
                </Col>
                <Col sm={9}>{scholarship[selected]?.lor}</Col>
              </Row>
              <br />
              <Row>
                <Col sm={3} className="modal-label">
                  Reason:
                </Col>
                <Col sm={9}>{scholarship[selected]?.reason}</Col>
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
            <Button variant="success" onClick={handleAccept}>
              Accept
            </Button>
            <Button variant="danger" onClick={handleShow}>
              Reject
            </Button>
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
            <Modal.Title>{scholarship[selected]?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Reason: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Add Reason for rejecting this application"
                  autoFocus
                  onChange={handleTextAreaChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Select reason for rejection:</Form.Label>
                <div>
                  <Form.Check
                    type="checkbox"
                    id="checkbox1"
                    label="Reason 1"
                    value="Reason 1"
                    onChange={handleCheckboxChange}
                  />
                  <Form.Check
                    type="checkbox"
                    id="checkbox2"
                    label="Reason 2"
                    value="Reason 2"
                    onChange={handleCheckboxChange}
                  />
                  <Form.Check
                    type="checkbox"
                    id="checkbox3"
                    label="Reason 3"
                    value="Reason 3"
                    onChange={handleCheckboxChange}
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleReject}>
              Reject
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default StudentDetails;
