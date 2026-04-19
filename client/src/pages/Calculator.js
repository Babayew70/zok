import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaCalculator, FaRuler, FaPaintRoller, FaBoxOpen } from 'react-icons/fa';
import './Calculator.css';

const Calculator = () => {
    const { theme } = useTheme();
    const { i18n } = useTranslation();
    const [area, setArea] = useState('');
    const [surfaceType, setSurfaceType] = useState('smooth');
    const [materialType, setMaterialType] = useState('emulsion');
    const [result, setResult] = useState(null);

    const t = (key) => {
        const texts = {
            tm: {
                title: 'Material Hasaplaýjy',
                subtitle: 'Diwaryňyzyň meýdanyny giriziň we gerekli materialy hasaplaň',
                area: 'Diwaryň meýdany (kw.m)',
                surface: 'Ýüzüň görnüşi',
                smooth: 'Tekiz',
                porous: 'Gözenekli',
                prepared: 'Taýýarlanan',
                material: 'Materialyň görnüşi',
                emulsion: 'Emulsiýa',
                travertine: 'Trawertine',
                ottocento: 'Attohento',
                lacquer: 'Lak',
                putty: 'Şpaklyowka',
                calculate: 'Hasaplamak',
                result: 'Netije',
                needed: 'Size gerek bolar',
                kg: 'kg material',
                cans: 'banka (5 kg)',
                layers: 'gatlak maslahat berilýär',
                tip: 'Bellik: Bu baha takmynan hasaplanýar. Hakyky sarp ediş ýerüsti şertlerine baglydyr.'
            },
            ru: {
                title: 'Калькулятор расхода',
                subtitle: 'Введите площадь стен и рассчитайте нужное количество материала',
                area: 'Площадь стен (кв.м)',
                surface: 'Тип поверхности',
                smooth: 'Гладкая',
                porous: 'Пористая',
                prepared: 'Подготовленная',
                material: 'Тип материала',
                emulsion: 'Эмульсия',
                travertine: 'Травертин',
                ottocento: 'Аттохенто',
                lacquer: 'Лак',
                putty: 'Шпаклёвка',
                calculate: 'Рассчитать',
                result: 'Результат',
                needed: 'Вам потребуется',
                kg: 'кг материала',
                cans: 'банок (5 кг)',
                layers: 'слоя рекомендуется',
                tip: 'Примечание: расчёт приблизительный. Фактический расход зависит от состояния поверхности.'
            },
            en: {
                title: 'Material Calculator',
                subtitle: 'Enter your wall area and calculate the amount of material needed',
                area: 'Wall area (sq.m)',
                surface: 'Surface type',
                smooth: 'Smooth',
                porous: 'Porous',
                prepared: 'Prepared',
                material: 'Material type',
                emulsion: 'Emulsion',
                travertine: 'Travertine',
                ottocento: 'Ottocento',
                lacquer: 'Lacquer',
                putty: 'Putty',
                calculate: 'Calculate',
                result: 'Result',
                needed: 'You will need',
                kg: 'kg of material',
                cans: 'cans (5 kg)',
                layers: 'layers recommended',
                tip: 'Note: this is an approximate calculation. Actual consumption depends on surface conditions.'
            }
        };
        return (texts[i18n.language] || texts.ru)[key] || key;
    };

    // Material consumption rates (kg per sq.m per layer)
    const consumptionRates = {
        emulsion: { smooth: 0.15, porous: 0.2, prepared: 0.12 },
        travertine: { smooth: 1.5, porous: 2.0, prepared: 1.2 },
        ottocento: { smooth: 0.3, porous: 0.45, prepared: 0.25 },
        lacquer: { smooth: 0.1, porous: 0.15, prepared: 0.08 },
        putty: { smooth: 1.2, porous: 1.8, prepared: 1.0 }
    };

    const recommendedLayers = {
        emulsion: 2,
        travertine: 1,
        ottocento: 2,
        lacquer: 1,
        putty: 1
    };

    const handleCalculate = () => {
        if (!area || parseFloat(area) <= 0) return;

        const areaNum = parseFloat(area);
        const rate = consumptionRates[materialType][surfaceType];
        const layers = recommendedLayers[materialType];
        const totalKg = Math.ceil(areaNum * rate * layers * 10) / 10;
        const totalCans = Math.ceil(totalKg / 5);

        setResult({ totalKg, totalCans, layers });
    };

    return (
        <div className={`calculator-page ${theme}`}>
            <motion.div
                className="calculator-hero"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <FaCalculator className="hero-icon" />
                <h1>{t('title')}</h1>
                <p>{t('subtitle')}</p>
            </motion.div>

            <motion.div
                className="calculator-container"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <div className="calculator-form glass-card">
                    <div className="calc-group">
                        <label><FaRuler /> {t('area')}</label>
                        <input
                            type="number"
                            min="0.1"
                            step="0.1"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            placeholder="25"
                            className="calc-input"
                        />
                    </div>

                    <div className="calc-group">
                        <label><FaPaintRoller /> {t('surface')}</label>
                        <div className="calc-options">
                            {['smooth', 'porous', 'prepared'].map((s) => (
                                <button
                                    key={s}
                                    className={`calc-option ${surfaceType === s ? 'active' : ''}`}
                                    onClick={() => setSurfaceType(s)}
                                >
                                    {t(s)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="calc-group">
                        <label><FaBoxOpen /> {t('material')}</label>
                        <div className="calc-options material-options">
                            {['emulsion', 'travertine', 'ottocento', 'lacquer', 'putty'].map((m) => (
                                <button
                                    key={m}
                                    className={`calc-option ${materialType === m ? 'active' : ''}`}
                                    onClick={() => setMaterialType(m)}
                                >
                                    {t(m)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.button
                        className="calc-submit btn-primary"
                        onClick={handleCalculate}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {t('calculate')}
                    </motion.button>
                </div>

                {result && (
                    <motion.div
                        className="calculator-result glass-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        <h2>{t('result')}</h2>
                        <div className="result-grid">
                            <div className="result-item">
                                <span className="result-value">{result.totalKg}</span>
                                <span className="result-label">{t('kg')}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-value">{result.totalCans}</span>
                                <span className="result-label">{t('cans')}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-value">{result.layers}</span>
                                <span className="result-label">{t('layers')}</span>
                            </div>
                        </div>
                        <p className="result-tip">{t('tip')}</p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Calculator;
