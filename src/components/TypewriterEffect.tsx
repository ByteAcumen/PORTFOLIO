import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterEffectProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  delayBetweenTexts?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  texts,
  speed = 90, // slightly faster for snappier feel
  deleteSpeed = 45, // slightly faster
  delayBetweenTexts = 1400 // shorter pause
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), delayBetweenTexts);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, delayBetweenTexts]);

  return (
    <motion.span
      className="font-mono font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg text-xl sm:text-2xl md:text-3xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {currentText}
      <motion.span
        className="ml-1 animate-blink text-blue-500/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.8, repeatType: 'reverse' }}
      >
        |
      </motion.span>
    </motion.span>
  );
};

export default TypewriterEffect;