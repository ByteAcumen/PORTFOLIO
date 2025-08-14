import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  texts: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ 
  texts, 
  className = '',
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const targetText = texts[currentTextIndex];
    let timeoutId: NodeJS.Timeout;
    
    const animate = () => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(prev => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        if (currentText.length < targetText.length) {
          setCurrentText(prev => targetText.slice(0, prev.length + 1));
        } else {
          setIsPaused(true);
        }
      }
    };

    // Use requestAnimationFrame for better performance when possible
    if (isPaused) {
      timeoutId = setTimeout(animate, pauseTime);
    } else {
      const delay = isDeleting ? deleteSpeed : typeSpeed;
      timeoutId = setTimeout(animate, delay);
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse text-accent">|</span>
    </span>
  );
};

export default TypewriterEffect;
