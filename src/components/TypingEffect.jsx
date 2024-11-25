import React from 'react';
import { useState, useEffect } from 'react';

const TypingEffect = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0);
  const words = [
    'Welcome To TaskMe 👋',
    'Track your tasks with ease 📝',
    'Make every day count with TaskMe 🤗',
  ];
  const typingSpeed = isDeleting ? 100 : 150;

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[loop % words.length];
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 3000); // Pause before deleting
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoop(loop + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loop, words, typingSpeed]);

  return (
    <>
      <h1 className='absolute -translate-y-[13em] text-primaryColor text-lg font-bold overflow-hidden whitespace-nowrap border-r-2 border-black animate-caret md:text-3xl md:-translate-y-[9em]'>
        {text}
      </h1>
    </>
  );
};

export default TypingEffect;
