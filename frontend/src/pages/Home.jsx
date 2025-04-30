import React from 'react';
import styles from './Home.module.css';
import ChatIcon from '../components/ui/ChatIcon';

const Home = () => {
  return (
    <div className={styles.landingContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
        <svg width="176" height="45" viewBox="0 0 176 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.25 4.10863C27.3042 4.10718 24.433 5.03495 22.0451 6.75991C19.6572 8.48486 17.8742 10.9191 16.95 13.7161C16.8848 13.9423 16.7746 14.153 16.6261 14.3356C16.4775 14.5182 16.2937 14.6689 16.0855 14.7788C15.8774 14.8887 15.6492 14.9555 15.4146 14.9751C15.18 14.9948 14.9439 14.9669 14.7204 14.8932C14.4968 14.8194 14.2905 14.7014 14.1136 14.546C13.9368 14.3907 13.7931 14.2013 13.6912 13.9891C13.5892 13.7769 13.5311 13.5464 13.5204 13.3113C13.5096 13.0761 13.5464 12.8412 13.6285 12.6206C14.8434 8.95194 17.238 5.78833 20.4391 3.62304C23.6401 1.45775 27.4677 0.412491 31.3249 0.650225C35.1822 0.887959 38.8525 2.39533 41.7634 4.93731C44.6743 7.47929 46.6623 10.913 47.4175 14.7031C50.0574 15.0597 52.4631 16.4064 54.1473 18.4703C55.8314 20.5343 56.6682 23.1612 56.4879 25.819C56.3077 28.4767 55.1241 30.9667 53.1767 32.7844C51.2293 34.6021 48.6639 35.6117 46 35.6086H16.25C15.7859 35.6086 15.3408 35.4242 15.0126 35.0961C14.6844 34.7679 14.5 34.3227 14.5 33.8586C14.5 33.3945 14.6844 32.9494 15.0126 32.6212C15.3408 32.293 15.7859 32.1086 16.25 32.1086H46C47.8565 32.1091 49.6372 31.372 50.9503 30.0596C52.2633 28.7472 53.0013 26.9669 53.0018 25.1104C53.0022 23.2539 52.2652 21.4732 50.9527 20.1601C49.6403 18.847 47.86 18.1091 46.0035 18.1086H45.9125C45.4799 18.1113 45.0616 17.9535 44.7384 17.6659C44.4153 17.3783 44.2101 16.9811 44.1625 16.5511C43.7794 13.1293 42.1488 9.96857 39.5822 7.67319C37.0157 5.37782 33.6932 4.10878 30.25 4.10863ZM0.500008 19.8586C0.500008 19.3945 0.684382 18.9494 1.01257 18.6212C1.34076 18.293 1.78588 18.1086 2.25001 18.1086H19.75C20.2141 18.1086 20.6593 18.293 20.9874 18.6212C21.3156 18.9494 21.5 19.3945 21.5 19.8586C21.5 20.3228 21.3156 20.7679 20.9874 21.0961C20.6593 21.4243 20.2141 21.6086 19.75 21.6086H2.25001C1.78588 21.6086 1.34076 21.4243 1.01257 21.0961C0.684382 20.7679 0.500008 20.3228 0.500008 19.8586ZM7.50001 26.8586C7.50001 26.3945 7.68438 25.9494 8.01257 25.6212C8.34076 25.293 8.78588 25.1086 9.25001 25.1086H40.75C41.2141 25.1086 41.6593 25.293 41.9874 25.6212C42.3156 25.9494 42.5 26.3945 42.5 26.8586C42.5 27.3228 42.3156 27.7679 41.9874 28.0961C41.6593 28.4243 41.2141 28.6086 40.75 28.6086H9.25001C8.78588 28.6086 8.34076 28.4243 8.01257 28.0961C7.68438 27.7679 7.50001 27.3228 7.50001 26.8586ZM0.500008 40.8586C0.500008 40.3945 0.684382 39.9494 1.01257 39.6212C1.34076 39.293 1.78588 39.1086 2.25001 39.1086H33.75C34.2141 39.1086 34.6593 39.293 34.9874 39.6212C35.3156 39.9494 35.5 40.3945 35.5 40.8586C35.5 41.3227 35.3156 41.7679 34.9874 42.0961C34.6593 42.4242 34.2141 42.6086 33.75 42.6086H2.25001C1.78588 42.6086 1.34076 42.4242 1.01257 42.0961C0.684382 41.7679 0.500008 41.3227 0.500008 40.8586Z" fill="#184E7F"/>
<path d="M66.3693 36.6086V7.51773H71.6392V19.8331H85.1193V7.51773H90.4034V36.6086H85.1193V24.2507H71.6392V36.6086H66.3693ZM109.814 27.4325V14.7905H114.956V36.6086H109.97V32.7308H109.743C109.25 33.9524 108.441 34.9514 107.314 35.728C106.196 36.5045 104.819 36.8927 103.18 36.8927C101.75 36.8927 100.486 36.5755 99.3878 35.941C98.2988 35.2971 97.4465 34.3643 96.831 33.1427C96.2154 31.9117 95.9077 30.4249 95.9077 28.6825V14.7905H101.05V27.8871C101.05 29.2696 101.429 30.3681 102.186 31.1825C102.944 31.9969 103.938 32.4041 105.169 32.4041C105.927 32.4041 106.661 32.2194 107.371 31.8501C108.081 31.4808 108.663 30.9316 109.118 30.2024C109.582 29.4638 109.814 28.5405 109.814 27.4325ZM120.471 36.6086V7.51773H125.613V18.3984H125.826C126.091 17.8681 126.465 17.3047 126.948 16.7081C127.431 16.102 128.085 15.5859 128.908 15.1598C129.732 14.7242 130.783 14.5064 132.062 14.5064C133.747 14.5064 135.267 14.9372 136.621 15.799C137.985 16.6513 139.065 17.9155 139.86 19.5916C140.665 21.2583 141.067 23.3037 141.067 25.728C141.067 28.1238 140.674 30.1598 139.888 31.8359C139.103 33.5121 138.032 34.7905 136.678 35.6711C135.324 36.5518 133.79 36.9922 132.076 36.9922C130.826 36.9922 129.789 36.7838 128.965 36.3672C128.141 35.9505 127.478 35.4486 126.977 34.8615C126.484 34.2649 126.101 33.7014 125.826 33.1711H125.528V36.6086H120.471ZM125.513 25.6996C125.513 27.1105 125.712 28.3463 126.11 29.4069C126.517 30.4675 127.1 31.2961 127.857 31.8927C128.624 32.4799 129.552 32.7734 130.641 32.7734C131.778 32.7734 132.729 32.4704 133.496 31.8643C134.263 31.2488 134.841 30.4107 135.229 29.3501C135.627 28.28 135.826 27.0632 135.826 25.6996C135.826 24.3454 135.632 23.1427 135.244 22.0916C134.855 21.0405 134.278 20.2166 133.511 19.62C132.744 19.0234 131.787 18.7251 130.641 18.7251C129.543 18.7251 128.61 19.0139 127.843 19.5916C127.076 20.1692 126.494 20.9789 126.096 22.0206C125.708 23.0622 125.513 24.2886 125.513 25.6996ZM150.581 7.51773V36.6086H145.439V7.51773H150.581ZM159.065 44.7905C158.364 44.7905 157.715 44.7336 157.119 44.62C156.531 44.5158 156.063 44.3927 155.712 44.2507L156.906 40.245C157.654 40.4628 158.321 40.567 158.908 40.5575C159.496 40.548 160.012 40.3634 160.457 40.0035C160.911 39.6532 161.295 39.066 161.607 38.2422L162.048 37.0632L154.136 14.7905H159.59L164.619 31.2677H164.846L169.888 14.7905H175.357L166.621 39.2507C166.214 40.406 165.674 41.3956 165.002 42.2194C164.33 43.0528 163.506 43.6872 162.531 44.1228C161.565 44.5679 160.409 44.7905 159.065 44.7905Z" fill="#184E7F"/>
</svg>

        </div>
        <div className={styles.headerActions}>
          <button className={styles.loginButton}>Login</button>
          <button className={styles.signupButton}>Sign up</button>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.textSection}>
          <h1 className={styles.title}>Grow Your Business Faster with Hubby CRM</h1>
          <p className={styles.subtitle}>Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.</p>
          <div className={styles.buttons}>
            <button className={styles.getStartedButton}>Get started +</button>
            <button className={styles.watchVideoButton}>Watch Video</button>
          </div>
        </div>
        <div className={styles.imageSection}>
          <img src="https://via.placeholder.com/400x500" alt="Business Meeting" className={styles.mainImage} />
          <div className={styles.widgetCalendar}>
            <p>June 2021</p>
            <div className={styles.calendarDays}>
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
            </div>
          </div>
          <div className={styles.widgetChat}>
            <p>Jerry Carlson joined Swimming</p>
            <span className={styles.chatTime}>Class - 11:22 AM</span>
          </div>
          <div className={styles.widgetStats}>
            <p>$18,750</p>
            <div className={styles.statsGraph}></div>
            <span>30%</span>
          </div>
        </div>
      </main>

      {/* CRM Section */}
      <section className={styles.crmSection}>
        <h2 className={styles.crmTitle}>At its core, Hubby is a robust CRM solution.</h2>
        <p className={styles.crmSubtitle}>Hubby helps businesses streamline customer interactions, track leads, and automate task-saving you time and maximizing revenue. Whether you're a startup or an enterprise, Hubby adapts to your needs, giving you the tools to scale efficiently.</p>
        <div className={styles.funnelDiagram}>
          <div className={styles.funnelStage}>CAPTURE</div>
          <div className={styles.funnelStage}>NURTURE</div>
          <div className={styles.funnelStage}>CLOSE</div>
          <div className={styles.funnelIcons}>
            <span>🌐</span><span>📱</span><span>📧</span><span>🎥</span><span>📊</span>
          </div>
          <p className={styles.funnelText}>MULTIPLE PLATFORMS TOGETHER!<br />Email communication is a breeze with a fully integrated, drag & drop email builder.</p>
          <ul className={styles.funnelList}>
            <li>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</li>
            <li>Nurture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</li>
          </ul>
        </div>
      </section>

      {/* Plans Section */}
      <section className={styles.plansSection}>
        <h2 className={styles.plansTitle}>We have plans for everyone!</h2>
        <p className={styles.plansSubtitle}>We started with a strong foundation, then simply built all sales and marketing tools all businesses need under one platform.</p>
        <div className={styles.plansCards}>
          <div className={styles.planCard}>
            <h3>STARTER</h3>
            <p className={styles.planPrice}>$199/month</p>
            <p className={styles.planDescription}>Best for local businesses needing to improve their online reputation.</p>
            <ul className={styles.planFeatures}>
              <li>Unlimited Users</li>
              <li>GMB Messaging</li>
              <li>Reputation Management</li>
              <li>GMB Call Tracking</li>
              <li>24/7 Award Winning Support</li>
            </ul>
            <button className={styles.planButton}>Sign up for Starter</button>
          </div>
          <div className={styles.planCard}>
            <h3>GROW</h3>
            <p className={styles.planPrice}>$399/month</p>
            <p className={styles.planDescription}>Best for all businesses that want to take full control of their marketing automation and track leads, click to close.</p>
            <ul className={styles.planFeatures}>
              <li>Pipeline Management</li>
              <li>Marketing Automation Campaigns</li>
              <li>Live Call Transfer</li>
              <li>GMB Messaging</li>
              <li>Embed-able Form Builder</li>
              <li>Reputation Management</li>
              <li>24/7 Award Winning Support</li>
            </ul>
            <button className={styles.planButton}>Sign up for Starter</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>🌐 Hubby</div>
        <div className={styles.footerColumns}>
          <div>
            <h4>Product</h4>
            <ul>
              <li>Universal checkout</li>
              <li>Payment workflows</li>
              <li>Observability</li>
              <li>upITI</li>
              <li>Apps & integrations</li>
            </ul>
          </div>
          <div>
            <h4>Why Primer</h4>
            <ul>
              <li>Expand to new markets</li>
              <li>Boost payment success</li>
              <li>Improve conversion rates</li>
              <li>Reduce payments fraud</li>
              <li>Recover revenue</li>
            </ul>
          </div>
          <div>
            <h4>Developers</h4>
            <ul>
              <li>Primer Docs</li>
              <li>API Reference</li>
              <li>Payment methods guide</li>
              <li>Service status</li>
              <li>Community</li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Success stories</li>
              <li>News room</li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerSocial}>
          <span>📧</span><span>🐦</span><span>📸</span><span>🎥</span><span>🌐</span>
        </div>
      </footer>
      <ChatIcon/>
    </div>
  );
};

export default Home;