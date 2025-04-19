import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Tickets from "../components/tickets/Tickets";
import Settings from "../components/settings/ProfileForm";
import styles from "../styles/Dashboard.module.css";
import Sidebar from "../components/layout/Sidebar";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContactCenter from "../components/contactCenter/ContactCenter";
import Analytics from "../components/analytics/Analytics";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // navigate("/dashboard/events");    
  },[])
  return (
    <div className={styles.dashboard}>
      <Sidebar />

      {/* Main Content Area */}
      <div className={styles.content}>
        <Routes>
          <Route
            path="tickets"
            element={
              <DashboardLayout
                headerAction="true"
                title="Dashboard"
                subtitle="Create events to share for people to book on your calendar."
              >
                <Tickets />
              </DashboardLayout>
            }
          />
          <Route
            path="contact-center"
            element={
              <DashboardLayout
                title="Contact Center"
                subtitle="See upcoming and past events booked through your event type links."
              >
                <ContactCenter />
              </DashboardLayout>
            }
          />
          <Route
            path="analytics"
            element={
              <DashboardLayout
                title="Analytics"
                subtitle="Set your available times for scheduling."
              >
                <Analytics />
              </DashboardLayout>
            }
          />
          <Route
            path="settings"
            element={
              <DashboardLayout
                title="Profile"
                subtitle="Manage settings for your profile"
              >
                <Settings />
              </DashboardLayout>
            }
          />
          <Route
            path="create"
            element={
              <DashboardLayout
                title="Create Event"
                subtitle="New events to share for people to book on your calendar."
              >
                {/* <EventForm /> */}
              </DashboardLayout>
            }
          />
          <Route
            path="event/:id/edit"
            element={
              <DashboardLayout
                title="Edit Event"
                subtitle="New events to share for people to book on your calendar."
              >
                {/* <EventForm /> */}
              </DashboardLayout>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
