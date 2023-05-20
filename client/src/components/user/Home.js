import React from 'react'
import { Card , Row , Col } from 'react-bootstrap'
import scholarshipImage from '../../../../client/src/images/scholarship.jpg'

const Home = () => {
  return (
    <>
    <section className="wrapper">
        <div className="container">
          <div className="grid-cols-2">
            <div className="grid-item-1" data-aos="fade-up" data-aos-duration="800">
              <h1 className="main-heading">
                Welcome to <span>Scholarship</span>
                <br />
              </h1>
              <p className="info-text">Empowering the next Generation</p>
              <div className="btn_wrapper">
                <a href='/scholarships'>
                <button
                  className="btn view_more_btn"
                  style={{
                    backgroundColor: "#335eea",
                    color: "#fff",
                    width: "200px",
                  }}
                >
                  view Scholarships
                  <i className="ri-arrow-right-line" />
                </button></a>
              </div>
            </div>
            <div className="grid-item-2" data-aos="fade-up" data-aos-duration="1000">
              <div className="team_img_wrapper">
                <img src={scholarshipImage} alt="Scholarship"/>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="statistics">
        <div className="container service-section">
        <h1>Statistics</h1>
          <Row>
            {/* <div className="grid-cols-4"> */}
            <Col>
              <div className="grid-col-item" data-aos="fade-up" data-aos-duration="500">
                <Card border="primary">
                  {/* <Card.Header>Header</Card.Header> */}
                  <Card.Body>
                    <Card.Title> 214532</Card.Title>
                    <Card.Text>Total Applications</Card.Text>
                  </Card.Body>
                </Card>
              </div></Col>
              <Col>
              <div className="grid-col-item" data-aos="fade-up" data-aos-duration="1000">
                <Card border="success">
                  {/* <Card.Header>Header</Card.Header> */}
                  <Card.Body>
                    <Card.Title>53246 </Card.Title>
                    <Card.Text>Scholarships Awarded</Card.Text>
                  </Card.Body>
                </Card>
              </div></Col>
              <Col>
              <div className="grid-col-item" data-aos="fade-up" data-aos-duration="1500">
                <Card border="warning">
                  {/* <Card.Header>Header</Card.Header> */}
                  <Card.Body>
                    <Card.Title>76565.98</Card.Title>
                    <Card.Text>Amount Disbursed</Card.Text>
                  </Card.Body>
                </Card>
              </div></Col>
              <Col>
              <div className="grid-col-item" data-aos="fade-up" data-aos-duration="2000">
                <Card border="dark">
                  {/* <Card.Header>Header</Card.Header> */}
                  <Card.Body>
                    <Card.Title>100</Card.Title>
                    <Card.Text>Number of Scholarship Schemes</Card.Text>
                  </Card.Body>
                </Card>
              </div></Col>
            {/* </div> */}
          </Row>
        </div>
      </div>
    </>
  )
}

export default Home