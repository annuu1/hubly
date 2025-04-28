import React, {useEffect} from 'react';
import ChatBotWindow from './ChatBotWindow';
import styles from './ChatBot.module.css';

import SettingsPanel from './SettingsPanel';
import axios from 'axios';

const ChatBot = () => {
  const [botSettings, setBotSettings] = React.useState({
    headerColor: '#33475B',
    backgroundColor: '#EEEEEE',
    customizedMessages: ['How can I help you?', 'Ask me anything!'],
    welcomeMessage: '👋 Want to chat about Hubly? I\'m a chatbot here to help you find your way.',
    missedChatTimer: '09:00:00',
  });
  const messages = [
    // {
    //   type: 'incoming',
    //   content: '👋 Want to chat about Hubly? I\'m a chatbot here to help you find your way.',
    // },
    // {
    //   type: 'outgoing',
    //   content: ['How can I help you?', 'Ask me anything!'],
    // },
  ];

  useEffect(() => {
    const fetchBotSettings = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + 'api/botSettings');
        const {
          headerColor,
          backgroundColor,
          customizedMessages,
          welcomeMessage,
          missedChatTimer,
        } = response.data.botSettings;
        setBotSettings({
          headerColor,
          backgroundColor,
          customizedMessages,
          welcomeMessage,
          missedChatTimer,
        });
      } catch (error) {
        console.log('Error fetching bot settings:', error);
      }
    };
  
    fetchBotSettings();
  }, []);
  

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>
        {/* Chatbot Window */}
        <div className={styles.chatBotPreview}>
        <ChatBotWindow messages={messages} botSetting={botSettings} />
        </div>
        <SettingsPanel />
        
      </main>
    </div>
  );
};

export default ChatBot;