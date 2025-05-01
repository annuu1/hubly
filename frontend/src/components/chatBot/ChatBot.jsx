import React, {useEffect} from 'react';
import ChatBotWindow from './ChatBotWindow';
import styles from './ChatBot.module.css';

import SettingsPanel from './SettingsPanel';
import axios from 'axios';
import WelcomeMessage from '../ui/WelcomeMessage';

const ChatBot = () => {
  const [botSettings, setBotSettings] = React.useState({
    headerColor: '',
    backgroundColor: '',
    customizedMessages: [''],
    welcomeMessage: '',
    missedChatTimer: '',
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
        console.log(response.data)
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
        <ChatBotWindow messages={messages}  botSettings={botSettings} setBotSettings={setBotSettings} />
        <div>
          <WelcomeMessage message={botSettings.welcomeMessage} isAbsolute={false}/>
        </div>
        </div>
        <SettingsPanel botSettings={botSettings} setBotSettings={setBotSettings} />
        
      </main>
    </div>
  );
};

export default ChatBot;