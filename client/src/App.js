import React, { useEffect } from "react";
// User Pages
import Navbar from "./components/user/Navbar";
import Home from "./components/user/Home";
import Information from "./components/user/Information";
import Contact from "./components/user/Contact";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ScholarshipTypes from "./components/user/ScholarshipTypes";
import ViewUserScholarships from "./components/user/ViewUserScholarships";
import ApplicationForm from "./components/user/ApplicationForm";
import UserDashboard from "./components/user/UserDashboard";
import MeritBased from "./components/user/MeritBased";
import NeedBased from "./components/user/NeedBased";
import ResearchBased from "./components/user/ResearchBased";
import InternatinalBased from "./components/user/InternatinalBased";
import MinorityBased from "./components/user/MinorityBased";
// Admin Pages
import AddScholarship from "./components/admin/AddScholarship";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/Login";
import AdminProfile from "./components/admin/AdminProfile";
import PreviousApplicationDetails from "./components/admin/PreviousApplicationDetails"
import StudentDetails from "./components/admin/StudentDetails";
import UpdateScholarship from "./components/admin/UpdateScholarship";
import ViewScholarships from "./components/admin/ViewScholarships";
import axios from "axios";

import { UserProvider } from "./context/auth";
import PrivateRoute from "./context/PrivateRoute";

// Animation on Scroll
import AOS from "aos";
import "aos/dist/aos.css";
// Routing
import { Route, Routes } from "react-router-dom";

const App = () => {
  useEffect(() => {
    document.title = "Scholarship Management Website";
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/scholarship_information"
            element={<Information />}
          ></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/scholarships" element={<ScholarshipTypes />}></Route>
          <Route
            path="/view-scholarships"
            element={<ViewUserScholarships />}
          ></Route>
          <Route
            path="/application-form/:id"
            element={<ApplicationForm />}
          ></Route>
          <Route path="/user-dashboard" element={<UserDashboard/>}/>
          <Route path="/merit-based-scholarships" element={<MeritBased/>}/>
          <Route path="/need-based-scholarships" element={<NeedBased/>}/>
          <Route path="/international-based-scholarships" element={<InternatinalBased/>}/>
          <Route path="/research-based-scholarships" element={<ResearchBased/>}/>
          <Route path="/minority-based-scholarships" element={<MinorityBased/>}/>

          {/* Admin Pages */}
          <Route path="/add-scholarship" element={<AddScholarship />}></Route>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/adminProfile" element={<AdminProfile />}></Route>
          <Route path="/admin_login" element={<AdminLogin />}></Route>
          <Route
            path="/adminDashboard/studentDetails"
            element={<StudentDetails />}
          />
          <Route
            path="/adminDashboard/previousApplicationsDetails"
            element={<PreviousApplicationDetails />}
          />
          <Route
            path="/update-scholarship/:id"
            element={<UpdateScholarship />}
          ></Route>
          <Route
            path="/viewScholarships"
            element={<ViewScholarships />}
          ></Route>
        </Routes>
        {/* <PrivateRoute path="/adminDashboard" component={<AdminDashboard />} /> */}
      </UserProvider>
    </>
  );
};

export default App;
