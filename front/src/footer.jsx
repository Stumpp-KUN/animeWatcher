import React, { useState } from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [discordHover, setDiscordHover] = useState(false);
  const [telegramHover, setTelegramHover] = useState(false);

  const handleDiscordHover = () => {
    setDiscordHover(true);
  };

  const handleDiscordLeave = () => {
    setDiscordHover(false);
  };

  const handleTelegramHover = () => {
    setTelegramHover(true);
  };

  const handleTelegramLeave = () => {
    setTelegramHover(false);
  };

  return (
    <div>
        
      <div className='animeWatch'>
        <div className='firstP'>
          <span className='text'>AnimeWatcher</span>
          <div className='social'>
            
            <div
              className='icon'
              onMouseEnter={handleDiscordHover}
              onMouseLeave={handleDiscordLeave}
            >
              <a
                href='https://discord.gg/krUuPwWV'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src={discordHover ? 'dis-hover.png' : 'dis-chill.png'}
                  alt="Discord"
                  className='icons'
                />
              </a>
            </div>
            
            <div
              className='icon'
              onMouseEnter={handleTelegramHover}
              onMouseLeave={handleTelegramLeave} 
            >
              <a
                href='https://t.me/stumppro'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src={telegramHover ? 'tel-hover.png' : 'tel-chill.png'}
                  alt="Telegram"
                  className='icons'
                />
              </a>
            </div>
            
          </div>
        </div>
        <div className='agree'> 
        <Link to="/userAgreement" className='agreement'>
          <span>Пользовательское соглашение</span>
          </Link>
          <Link to="/copyright" className='agreement'>
          <span>Правообладателям</span>
          </Link>
          <Link to="/privacy" className='agreement'>
          <span>Политика конфиденциальности</span>
          </Link>
          </div>


        <div className='online'>
          <span>Сейчас онлайн: </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
