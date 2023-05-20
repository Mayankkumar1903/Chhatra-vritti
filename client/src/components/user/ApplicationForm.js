import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/auth";
function MyModal(props) {
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
        <a href="/scholarships">
          <Button onClick={props.onHide}>Ok</Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
}

const ApplicationForm = () => {
  const userEmail = localStorage.getItem("email");
  const {
    loggedIn,
    setLoggedIn,
    user,
    setUser,
    adminLoggedIn,
    setAdminLoggedIn,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const params = useParams();
  const [scholarshipName, setScholarshipName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [adharCard, setAdharCard] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [income, setIncome] = useState("");
  const [incomeProof, setIncomeProof] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [uid, setUid] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [achievements, setAchievements] = useState("");
  const [extracurricular, setExtracurricular] = useState("");
  const [lor, setLor] = useState("");
  const [certificates, setCertificates] = useState("");
  const getSingleScholarship = async () => {
    try {
      // const id = params.id.toString();
      const { data } = await axios.get(
        `http://localhost:8080/scholarship/${params.id}`
      );
      // setUserId(data.scholarship._id);
      setScholarshipName(data.scholarship.scholarshipName);
      setAmount(data.scholarship.amount);
      setCategory(data.scholarship.category);
      setEmail(userEmail);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getSingleScholarship();
    //eslint-disable-next-line
  }, []);

  const [modalShow, setModalShow] = React.useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/application-form`, {
        scholarshipName,
        category,
        amount,
        name,
        mobile,
        email,
        dob,
        age,
        gender,
        address,
        country,
        adharCard,
        bankName,
        accountNumber,
        branch,
        income,
        incomeProof,
        collegeName,
        uid,
        collegeEmail,
        degree,
        cgpa,
        achievements,
        extracurricular,
        lor,
        certificates,
      });
      if (res && res.data.success) {
        alert(res.data.message);
        navigate("/user-dashboard");
        // refresh page after submit is done
        window.location.reload();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1: //Personal-Details
        return (
          <>
            <Container>
              <div className="pd-20 card-box mb-30">
                <div className="clearfix">
                  <h3 className="text-blue " style={{ color: " #2b50c7" }}>
                    Personal Details
                  </h3>
                </div>
                {/* <form className="bg-transparent"> */}
                <Container>
                  {/* Name */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={2}>
                        <label className="col-form-label">
                          Name <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={10}>
                        <div className="">
                          <input
                            name="name"
                            className="form-control"
                            type="text"
                            placeholder="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* Mobile NUmber and Email*/}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={2}>
                        <label className="col-form-label">
                          Mobile Number <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="">
                          <input
                            name="mobile"
                            required
                            className="form-control"
                            type="text"
                            placeholder="Enter Mobile Number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={1}>
                        <label className="col-form-label">
                          Email <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={6}>
                        <div className="">
                          {/* <input
                            name="email"
                            required
                            className="form-control"
                            type="email"
                            placeholder="Enter email id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          /> */}
                          <input
                          plaintext readOnly name="email" className="form-control" value={email}/>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* DOB, Age and Gender */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={2}>
                        <label className="    col-form-label">
                          Date of Birth <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="   ">
                          <input
                            name="dob"
                            className="form-control datepicker"
                            placeholder="Select Date"
                            type="date"
                            required
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={1}>
                        <label className=" col-form-label">
                          Age <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="   ">
                          <input
                            name="age"
                            className="form-control"
                            type="number"
                            required
                            placeholder="Enter Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={1}>
                        <label className="    col-form-label">
                          Gender <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={2}>
                        <div className="   ">
                          <Col sm={12} md={12}>
                            <select
                              required
                              className="custom-select"
                              name="gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option defaultValue="">Choose Gender </option>
                              <option value={"male"}>Male</option>
                              <option value={"female"}>Female</option>
                              <option value={"other"}>Other</option>
                            </select>
                          </Col>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* Address */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={2}>
                        <label className="col-form-label">
                          Address <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={6}>
                        <div className="">
                          <input
                            name="address"
                            required
                            className="form-control"
                            type="text"
                            placeholder="Enter Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={1}>
                        <label className="col-form-label">
                          Country<span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="">
                          <input
                            name="country"
                            className="form-control"
                            type="text"
                            required
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* Adhar Card */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={2}>
                        <label className="col-form-label">
                          Adhar Card <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={4}>
                        <div className="">
                          <input
                            name="adharCard"
                            className="form-control"
                            type="text"
                            placeholder="Enter Adhar Card number"
                            required
                            value={adharCard}
                            onChange={(e) => setAdharCard(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12} md={2}>
                        <label className="col-form-label" />
                      </Col>
                      <Col xs={12} md={2}>
                        <div className="   ">
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => setModalShow(true)}
                          >
                            Cancel
                          </button>
                        </div>
                      </Col>
                      <Col xs={12} md={2}>
                        <div className="   ">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleNext}
                          >
                            Next
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <MyModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </Container>
                {/* </form> */}
              </div>
            </Container>
          </>
        );
      case 2: //Bank and Income Details
        return (
          <>
            <Container>
              <div className="pd-20 card-box mb-30">
                <div className="clearfix">
                  <h3 className="text-blue " style={{ color: " #2b50c7" }}>
                    Bank Details
                  </h3>
                  {/* <h4>Bank Details</h4> */}
                </div>
                {/* <form className="bg-transparent"> */}
                <Container>
                  {/* Name */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={2}>
                        <label className="col-form-label">
                          Bank Name <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={10}>
                        <div className="">
                          <input
                            name="bankName"
                            className="form-control"
                            required
                            type="text"
                            placeholder="Bank Name"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* Account Number */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={2}>
                        <label className="col-form-label">
                          Account Number <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={4}>
                        <div className="">
                          <input
                            name="accountNumber"
                            className="form-control"
                            type="text"
                            required
                            placeholder="Enter Account Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={1}>
                        <label className="col-form-label">
                          Branch <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={5}>
                        <div className="">
                          <input
                            name="branch"
                            className="form-control"
                            type="text"
                            required
                            placeholder="Enter Bank Branch name"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <h3 className="text-blue " style={{ color: " #2b50c7" }}>
                    Income Details
                  </h3>

                  {/* DOB, Age and Gender */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={2}>
                        <label className=" col-form-label">
                          Income <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={4}>
                        <div className="   ">
                          <input
                            name="income"
                            className="form-control"
                            type="number"
                            placeholder="Enter Income"
                            required
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={2}>
                        <label className=" col-form-label">
                          Proof of Income <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={4}>
                        <div className="   ">
                          <input
                            name="incomeProof"
                            className="form-control"
                            type="file"
                            placeholder="Attach Proof of Income"
                            value={incomeProof}
                            onChange={(e) => setIncomeProof(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* SUbmit Button */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} md={2}>
                        <div className="   ">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handlePrev}
                          >
                            Previous
                          </button>
                        </div>
                      </Col>
                      <Col xs={12} md={6}>
                        <label className="col-form-label" />
                      </Col>
                      <Col xs={12} md={2}>
                        <div className="   ">
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => setModalShow(true)}
                          >
                            Cancel
                          </button>
                        </div>
                      </Col>
                      <Col xs={12} md={2}>
                        <div className="   ">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleNext}
                          >
                            Next
                          </button>
                        </div>
                      </Col>
                    </Row>
                    <MyModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </div>
                </Container>
                {/* </form> */}
              </div>
            </Container>
          </>
        );
      case 3: //Academic Details
        return (
          <>
            <Container>
              <div className="pd-20 card-box mb-30">
                <div className="clearfix">
                  <h3 className="text-blue " style={{ color: " #2b50c7" }}>
                    Academic Details
                  </h3>
                </div>
                <Container>
                  {/* College Name */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={2}>
                        <label className="col-form-label">
                          Name of College <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={10}>
                        <div className="">
                          <input
                            name="collegeName"
                            className="form-control"
                            type="text"
                            required
                            placeholder="Enter College Name"
                            value={collegeName}
                            onChange={(e) => setCollegeName(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* UID and Email*/}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={2}>
                        <label className="col-form-label">
                          UID <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="">
                          <input
                            name="uid"
                            className="form-control"
                            type="text"
                            required
                            placeholder="Enter UID"
                            value={uid}
                            onChange={(e) => setUid(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={1}>
                        <label className="col-form-label">
                          Email <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={6}>
                        <div className="">
                          <input
                            name="collegeEmail"
                            className="form-control"
                            required
                            type="email"
                            placeholder="Enter your college email id"
                            value={collegeEmail}
                            onChange={(e) => setCollegeEmail(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* DOB, Age and Gender */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={2}>
                        <label className="    col-form-label">
                          Degree <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="">
                          <Col sm={12} md={12}>
                            <select
                              className="custom-select"
                              name="degree"
                              required
                              value={degree}
                              onChange={(e) => setDegree(e.target.value)}
                            >
                              <option defaultValue="">Choose Degree </option>
                              <option value={"B.E."}>B.E.</option>
                              <option value={"B.Tech"}>B.Tech</option>
                              <option value={"B.Sc"}>B.Sc</option>
                            </select>
                          </Col>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={1}>
                        <label className=" col-form-label">
                          GPA <span className="compulsory">*</span>
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="   ">
                          <input
                            name="cgpa"
                            className="form-control"
                            type="number"
                            placeholder="Enter Current GPA"
                            required
                            value={cgpa}
                            onChange={(e) => setCgpa(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* Achievements */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={2}>
                        <label className="col-form-label">Achievements</label>
                      </Col>
                      <Col xs={12} sm={12} md={10}>
                        <div className="">
                          <input
                            name="achievements"
                            className="form-control"
                            type="text"
                            placeholder="Enter Achievements"
                            value={achievements}
                            onChange={(e) => setAchievements(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* Extracurricular Activities */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={3}>
                        <label className="col-form-label">
                          Extracurricular Activities
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={9}>
                        <div className="">
                          <input
                            name="extracurricular"
                            className="form-control"
                            type="text"
                            placeholder="Enter Extracurricular Activities (if any)"
                            value={extracurricular}
                            onChange={(e) => setExtracurricular(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* Letter Of Recommendation */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} sm={12} md={3}>
                        <label className="col-form-label">
                          Letter of Recommendation
                        </label>
                      </Col>
                      <Col xs={12} sm={12} md={4}>
                        <div className="">
                          <input
                            name="lor"
                            className="form-control"
                            type="file"
                            placeholder="Attach Letter of Recommendation (if any)"
                            value={lor}
                            onChange={(e) => setLor(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={1}>
                        <label className="col-form-label">Certificates</label>
                      </Col>
                      <Col xs={12} sm={12} md={4}>
                        <div className="">
                          <input
                            name="certificates"
                            className="form-control"
                            type="file"
                            multiple
                            placeholder="Attach Letter of Recommendation (if any)"
                            value={certificates}
                            onChange={(e) => setCertificates(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* SUbmit Button */}
                  <div className="form-group  ">
                    <Row>
                      <Col xs={12} md={2}>
                        <div className="   ">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handlePrev}
                          >
                            Previous
                          </button>
                        </div>
                      </Col>
                      <Col xs={12} md={6}>
                        <label className="col-form-label" />
                      </Col>
                      <Col xs={12} md={2}>
                        <div className="   ">
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                          >
                            Cancel
                          </button>
                        </div>
                      </Col>
                      <Col xs={12} md={2}>
                        <div className="   ">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Container>
              </div>
            </Container>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <form className="bg-transparent">
        <h2
          className="text-blue "
          style={{ color: " #2b50c7", textAlign: "center" }}
        >
          Application form
        </h2>
        {renderStep()}
      </form>
    </>
  );
};
export default ApplicationForm;
