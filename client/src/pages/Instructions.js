import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FaTools, FaPaintRoller, FaBrush, FaCheckCircle, FaPlayCircle } from 'react-icons/fa';
import './Instructions.css';

const Instructions = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const steps = [
    {
      icon: <FaTools />,
      number: '01',
      title: t('instructions.step1'),
      description: t('instructions.step1Desc'),
      details: [
        t('instructions.step1Detail1'),
        t('instructions.step1Detail2'),
        t('instructions.step1Detail3'),
        t('instructions.step1Detail4')
      ]
    },
    {
      icon: <FaPaintRoller />,
      number: '02',
      title: t('instructions.step2'),
      description: t('instructions.step2Desc'),
      details: [
        t('instructions.step2Detail1'),
        t('instructions.step2Detail2'),
        t('instructions.step2Detail3'),
        t('instructions.step2Detail4')
      ]
    },
    {
      icon: <FaBrush />,
      number: '03',
      title: t('instructions.step3'),
      description: t('instructions.step3Desc'),
      details: [
        t('instructions.step3Detail1'),
        t('instructions.step3Detail2'),
        t('instructions.step3Detail3'),
        t('instructions.step3Detail4')
      ]
    },
    {
      icon: <FaCheckCircle />,
      number: '04',
      title: t('instructions.step4'),
      description: t('instructions.step4Desc'),
      details: [
        t('instructions.step4Detail1'),
        t('instructions.step4Detail2'),
        t('instructions.step4Detail3'),
        t('instructions.step4Detail4')
      ]
    }
  ];

  return (
    <div className={`instructions-page ${theme}`}>
      <div className="instructions-hero">
        <h1>{t('instructions.title')}</h1>
        <p>{t('instructions.subtitle')}</p>
      </div>

      <div className="instructions-content">
        <div className="timeline">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="timeline-marker">
                <span className="step-number">{step.number}</span>
              </div>

              <div className="timeline-content">
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <ul className="step-details">
                  {step.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="video-section">
          <h2>{t('instructions.videoTitle')}</h2>
          <div className="video-placeholder">
            <FaPlayCircle className="play-icon" />
            <p>{t('instructions.videoComingSoon')}</p>
          </div>
        </div>

        <div className="tips-section">
          <h2>{t('instructions.tipsTitle')}</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-emoji">🌡️</span>
              <h4>{t('instructions.tipTempTitle')}</h4>
              <p>{t('instructions.tipTempDesc')}</p>
            </div>
            <div className="tip-card">
              <span className="tip-emoji">💧</span>
              <h4>{t('instructions.tipHumTitle')}</h4>
              <p>{t('instructions.tipHumDesc')}</p>
            </div>
            <div className="tip-card">
              <span className="tip-emoji">⏰</span>
              <h4>{t('instructions.tipDryTitle')}</h4>
              <p>{t('instructions.tipDryDesc')}</p>
            </div>
            <div className="tip-card">
              <span className="tip-emoji">🔧</span>
              <h4>{t('instructions.tipToolTitle')}</h4>
              <p>{t('instructions.tipToolDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;

