import React from "react";
import { Container, Row, Col, Button, Tab, Nav ,Tabs} from "react-bootstrap";
import AddScholarship from "./AddScholarship";
import ScholarshipTypes from "../user/ScholarshipTypes";
import AdminProfile from "./AdminProfile";
import ViewScholarships from "./ViewScholarships";
import StudentDetails from "./StudentDetails";
import PreviousApplicationDetails from "./PreviousApplicationDetails"

const AdminDashboard = () => {
  return (
    <>
    <Tabs
      defaultActiveKey="scholarships"
      id="justify-tab-example"
      className="mb-3"
      justify
      style={{height:"50px"}}
    >
      <Tab eventKey="scholarships" title="View Scholarships">
        <ViewScholarships/>
      </Tab>
      <Tab eventKey="scholarship-form" title="Create Scholarships">
        <AddScholarship/>
      </Tab>
      <Tab eventKey="student-details" title="Student Details">
        <StudentDetails/>
      </Tab>
      <Tab eventKey="previous-details" title="Previous Applications">
        <PreviousApplicationDetails/>
      </Tab>
      <Tab eventKey="profile" title="Profile" >
        <AdminProfile/>
      </Tab>
    </Tabs>

    </>
  );
};

export default AdminDashboard;
