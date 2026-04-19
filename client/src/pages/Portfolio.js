import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaImages, FaTags } from 'react-icons/fa';
import axios from 'axios';
import './Portfolio.css';

import API_URL from '../config';
import { getImageUrl } from '../utils/imageUrl';

const Portfolio = () => {
    const { theme } = useTheme();
    const { i18n } = useTranslation();
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${API_URL}/portfolio`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        }
    };

    const getTitle = (p) => {
        if (i18n.language === 'tm') return p.title_tm || p.title_ru;
        if (i18n.language === 'en') return p.title_en || p.title_ru;
        return p.title_ru;
    };

    const getDescription = (p) => {
        if (i18n.language === 'tm') return p.description_tm || p.description_ru;
        if (i18n.language === 'en') return p.description_en || p.description_ru;
        return p.description_ru;
    };

    const pageTitle = i18n.language === 'tm' ? 'Portfolio' : i18n.language === 'en' ? 'Portfolio' : 'Портфолио';
    const pageSubtitle = i18n.language === 'tm' ? 'Biziň tamamlanan taslamalarymyz' : i18n.language === 'en' ? 'Our completed projects' : 'Наши завершённые проекты';

    return (
        <div className={`portfolio-page ${theme}`}>
            <motion.div className="portfolio-hero" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <FaImages className="hero-icon" />
                <h1>{pageTitle}</h1>
                <p>{pageSubtitle}</p>
            </motion.div>

            <div className="portfolio-container">
                {projects.length === 0 ? (
                    <motion.div className="portfolio-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        <FaImages style={{ fontSize: '3rem', color: 'var(--color-text-light)', marginBottom: '1rem' }} />
                        <p>{i18n.language === 'tm' ? 'Taslamalar ýakynda goşular' : i18n.language === 'en' ? 'Projects coming soon' : 'Проекты скоро появятся'}</p>
                    </motion.div>
                ) : (
                    <div className="portfolio-grid">
                        {projects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                className="portfolio-card glass-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="portfolio-image">
                                    {project.image_url ? (
                                        <img src={getImageUrl(project.image_url)} alt={getTitle(project)} />
                                    ) : (
                                        <div className="portfolio-placeholder"><FaImages /></div>
                                    )}
                                </div>
                                <div className="portfolio-info">
                                    <h3>{getTitle(project)}</h3>
                                    <p>{getDescription(project)}</p>
                                    {project.materials_used && (
                                        <div className="portfolio-tags">
                                            <FaTags />
                                            <span>{project.materials_used}</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {selectedProject && (
                <div className="portfolio-lightbox" onClick={() => setSelectedProject(null)}>
                    <motion.div
                        className="lightbox-content glass-card"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {selectedProject.image_url && (
                            <img src={getImageUrl(selectedProject.image_url)} alt={getTitle(selectedProject)} />
                        )}
                        <div className="lightbox-info">
                            <h2>{getTitle(selectedProject)}</h2>
                            <p>{getDescription(selectedProject)}</p>
                            {selectedProject.materials_used && (
                                <div className="portfolio-tags"><FaTags /><span>{selectedProject.materials_used}</span></div>
                            )}
                        </div>
                        <button className="lightbox-close" onClick={() => setSelectedProject(null)}>✕</button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;
