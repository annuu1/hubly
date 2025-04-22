import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.landingContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>🌐 Hubby</div>
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
    </div>
  );
};

export default Home;