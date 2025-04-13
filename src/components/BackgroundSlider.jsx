// src/components/BackgroundSlider.jsx
import { useEffect, useState } from 'react';

const images = [
  '/public/images/crash1.jpg',
  '/public/images/crash2.jpg',
  '/public/images/crash3.jpg',
];

export default function BackgroundSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000); // change every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
      style={{
        backgroundImage: `url(${images[index]})`,
        opacity: 0.15,
      }}
    />
  );
}
