import React, { useState } from 'react';
import { FaWhatsapp, FaTelegramPlane, FaCommentDots, FaTimes } from 'react-icons/fa';
import './FloatingMessenger.css';

const FloatingMessenger = () => {
    const [isOpen, setIsOpen] = useState(false);

    const whatsappUrl = 'https://wa.me/99363211003?text=' + encodeURIComponent('Здравствуйте, я хочу узнать насчет декоративных материалов ZOK.');
    const telegramUrl = 'https://t.me/+99363211003';

    return (
        <div className={`floating-messenger ${isOpen ? 'open' : ''}`}>
            {isOpen && (
                <div className="messenger-buttons">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="messenger-btn whatsapp"
                        title="WhatsApp"
                    >
                        <FaWhatsapp />
                        <span>WhatsApp</span>
                    </a>
                    <a
                        href={telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="messenger-btn telegram"
                        title="Telegram"
                    >
                        <FaTelegramPlane />
                        <span>Telegram</span>
                    </a>
                </div>
            )}
            <button
                className="floating-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open messenger"
            >
                {isOpen ? <FaTimes /> : <FaCommentDots />}
            </button>
        </div>
    );
};

export default FloatingMessenger;
