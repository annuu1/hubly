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
import ChatBot from "../components/chatBot/ChatBot";
import Team from "../components/team/Team";

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
                title="Dashboard"
              >
                <Tickets />
              </DashboardLayout>
            }
          />
          <Route
            path="contact-center"
            element={
              // <DashboardLayout
              //   title="Contact Center"
              //   subtitle="See upcoming and past events booked through your event type links."
              // >
                <ContactCenter />
              // </DashboardLayout>
            }
          />
          <Route
            path="analytics"
            element={
              <DashboardLayout
                title="Analytics"
              >
                <Analytics />
              </DashboardLayout>
            }
          />
          <Route
            path="chat-bot"
            element={
              <DashboardLayout
                title="Chat Bot"
              >
                <ChatBot />
              </DashboardLayout>
            }
          />
          <Route
            path="team"
            element={
              <DashboardLayout
                title="Team"
              >
                <Team />
              </DashboardLayout>
            }
          />
          <Route
            path="settings"
            element={
              <DashboardLayout
                title="Settings"
              >
                <Settings />
              </DashboardLayout>
            }
          />
          
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
