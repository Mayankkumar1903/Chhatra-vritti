import React, { useState, useEffect } from "react";
import { Container, Row, Button, Col, Card, Table ,Modal} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [scholarship, setScholarship] = useState([]);
  const userEmail = localStorage.getItem("email");

  // Get function
  const getScholarships = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/get-user-applications/${userEmail}`
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

  const handleDelete = async() => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/get-applications/${scholarship[selected]?._id}`
      );
      alert(data.message);
      navigate("/user-dashboard");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }


  const date = new Date(scholarship.timestamp);
  const timestampString = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleButtonClick = (index) => {
    setSelected(index);
    setShowModal(true);
  };

  return (
    <>
      <Container>
        <Table responsive>
          <thead>
            <tr>
              <th>Scholarship Name</th>
              <th>Category</th>
              <th>Amount</th>
               <th>Status</th>      {/* add status to schema */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scholarship?.map((item, index) => (
              <tr key={item._id}>
                <td>{item.scholarshipName}</td>
                <td>{item.category}</td>
                <td>{item.amount}</td>
                {item.status === "Rejected" ? (<td><Button variant="danger">{item.status}</Button></td>) :item.status ==="Accepted" ?(<td><Button variant="success">{item.status}</Button></td>) : (<td><Button variant="warning" style={{width : "150px"}}>{item.status}</Button></td>)}
                {/* <td>{item.status}</td> */}
                { item.status === "Accepted" || item.status ==="Rejected" ? (
                  <></>
                ) :(<td>
                  <Button onClick={() => handleButtonClick(index)}>
                    View More
                  </Button>
                </td>)}
                {/* <td>
                 <Button onClick={() => handleButtonClick(index)}>
                   View More
                  </Button>
                </td> */}
                
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
              <Col sm={3} className="modal-label">
                Amount:
              </Col>
              <Col sm={3}>{scholarship[selected]?.amount}</Col>
              <Col sm={2} className="modal-label">
                Category:
              </Col>
              <Col sm={3}>{scholarship[selected]?.category}</Col>              
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Bank Name:
              </Col>
              <Col sm={9}>{`${scholarship[selected]?.bankName} , ${scholarship[selected]?.branch}`}</Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                Income
              </Col>
              <Col sm={3}>{scholarship[selected]?.income}</Col>
              <Col sm={2} className="modal-label">
                Income proof:
              </Col>
              <Col sm={4}>{scholarship[selected]?.incomeProof}</Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                College Name:
              </Col>
              <Col sm={9}>{scholarship[selected]?.collegeName}</Col>
            </Row>
            <br />
            <Row>
              <Col sm={3} className="modal-label">
                UID:
              </Col>
              <Col sm={3}>{scholarship[selected]?.uid}</Col>
              <Col sm={3} className="modal-label">
                College Email Id:
              </Col>
              <Col sm={2}>{scholarship[selected]?.collegeEmail}</Col>
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
          </Container>
          {/* <p>Deadline: {data[selected]?.deadline}</p>
          <p>Last Date to Update Details: {data[selected]?.lastDateUpdate}</p>
          <p>Amount: {data[selected]?.amount}</p>
          <p>Eligibility: {data[selected]?.eligibility}</p>
          <p>Documents Required: {data[selected]?.DocumentsRequired}</p> */}
        </Modal.Body>
        <Modal.Footer>
          {/* <Link to={`/update-scholarship/${scholarship[selected]?._id}`}>
            <Button variant="primary" >Update</Button>
          </Link> */}
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
          Are you sure You want to delete this Application?
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

export default UserDashboard;
