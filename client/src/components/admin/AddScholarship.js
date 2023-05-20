import React, { useState ,useContext} from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/auth";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to cancel this form? </h4>
        <p>All of your input will be lost.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="outline-primary">
          Close
        </Button>
        <a href="/merit-scholarships">
          <Button onClick={props.onHide}>Ok</Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
}

const AddScholarship = () => {
  const navigate = useNavigate();
  const { loggedIn,
    setLoggedIn,
    user,
    setUser,
    adminLoggedIn,
    setAdminLoggedIn, } = useContext(UserContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [scholarshipName, setScholarshipName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [documents, setDocuments] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(adminLoggedIn){
      const res = await axios.post(`http://localhost:8080/createscholarships`, {
        scholarshipName,
        deadline,
        category,
        amount,
        eligibility,
        documents,
        description,
      });
      if (res && res.data.success) {
        alert(res.data.message);
        navigate("/adminDashboard");
        // Reset the inputs to blank
        e.target.reset();
        setScholarshipName("");
        setDeadline("");
        setCategory("");
        setAmount("");
        setEligibility("");
        setDocuments("");
        setDescription("");
        // refresh page after submit is done
        window.location.reload();
      } else {
        alert(res.data.message);
      }}
      else{
        console.log("Unautherized Access")
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      {/* Scholarship Creation form */}
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      {/* <Navbar /> */}
      <Container>
        <div className="pd-20 card-box mb-30">
          <div className="clearfix">
            <h3
              className="text-blue "
              style={{ color: " #2b50c7", textAlign: "center" }}
            >
              Create Scholarship Form
            </h3>
          </div>
          <Form
            className="bg-transparent"
            method="POST"
            onSubmit={handleSubmit}
          >
            <Container>
              {/* Name */}
              <div className="form-group  ">
                <Row>
                  <Col xs={12} sm={12} md={2}>
                    <label className="col-form-label">
                      Scholarship Name <span className="compulsory">*</span>
                    </label>
                  </Col>
                  <Col xs={12} sm={12} md={10}>
                    <div className="">
                      <input
                        name="name"
                        className="form-control"
                        type="text"
                        placeholder="Enter Scholarship Name"
                        required
                        value={scholarshipName}
                        onChange={(e) => setScholarshipName(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Deadline */}
              <div className="form-group  ">
                <Row>
                  <Col xs={12} sm={12} md={2}>
                    <label className="    col-form-label">
                      Deadline <span className="compulsory">*</span>
                    </label>
                  </Col>
                  <Col xs={12} sm={12} md={2}>
                    <div className="   ">
                      <input
                        name="deadline"
                        className="form-control datepicker"
                        type="date"
                        required
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={1}>
                    <label className="    col-form-label">
                      Amount <span className="compulsory">*</span>
                    </label>
                  </Col>
                  <Col xs={12} sm={12} md={2}>
                    <div className="   ">
                      <input
                        name="amount"
                        className="form-control"
                        type="number"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </Col>

                  <Col xs={12} sm={12} md={1}>
                    <label className="    col-form-label">
                      Category <span className="compulsory">*</span>
                    </label>
                  </Col>
                  <Col xs={12} sm={12} md={4}>
                    <div className="   ">
                      <Col sm={12} md={12}>
                        {/* <div className="   ">
                      <input
                        name="category"
                        className="form-control "
                        type="text"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div> */}
                        <Form.Select
                          name="category"
                          value={category}
                          className="custom-select"
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                          required
                        >
                          <option value={""}>
                            Choose Scholarship Category{""}
                          </option>
                          <option value={"merit-based"}>Merit</option>
                          <option value={"minority-based"}>Minority</option>
                          <option value={"need-based"}>Need based</option>
                          <option value={"international"}>International</option>
                          <option value={"research-based"}>
                            Research Based
                          </option>
                        </Form.Select>
                      </Col>
                    </div>
                  </Col>
                </Row>
              </div>
              {/* Eligibility Criteria */}
              <div className="form-group  ">
                <Row>
                  <Col xs={12} sm={12} md={2}>
                    <label className="col-form-label">
                      Eligibility Criteria <span className="compulsory">*</span>
                    </label>
                  </Col>
                  <Col xs={12} sm={12} md={10}>
                    <div className="">
                      <input
                        name="eligibility"
                        className="form-control"
                        type="text"
                        placeholder="Enter Eligibility Criteria"
                        value={eligibility}
                        onChange={(e) => setEligibility(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              {/* Documents Required */}
              <div className="form-group  ">
                <Row>
                  <Col xs={12} sm={12} md={2}>
                    <label className="col-form-label">
                      Documents Required <span className="compulsory">*</span>
                    </label>
                  </Col>
                  <Col xs={12} sm={12} md={10}>
                    <div className="">
                      <input
                        name="documents"
                        className="form-control"
                        type="text"
                        placeholder="Enter Documents Required"
                        value={documents}
                        onChange={(e) => setDocuments(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              {/* Description */}
              <div className="form-group  ">
                <Row>
                  <Col xs={12} sm={12} md={2}>
                    <label className="col-form-label">Extra Information</label>
                  </Col>
                  <Col xs={12} sm={12} md={10}>
                    <div className="">
                      <input
                        name="Description"
                        className="form-control"
                        type="text"
                        placeholder="Add Extra information if any"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
              </div>

              {/* SUbmit Button */}
              <div className="form-group  ">
                <Row>
                  <Col>
                    <div style={{ textAlign: "center" }}>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </Col>
                  <Col>
                    <div style={{ textAlign: "center" }}>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => setModalShow(true)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Container>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default AddScholarship;
