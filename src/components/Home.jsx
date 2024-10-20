import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // State for managing slideshow images
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // Array of images for the slideshow
  const images = [
    './img1.jpg',
    './img2.jpg',
    './img3.jpg',
    './img4.jfif',
  ];

  // Function to handle the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to handle the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Effect to handle automatic image transition
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextImage, 3000); // Change image every 3 seconds
      return () => clearInterval(interval); // Clean up on unmount or hover
    }
  }, [isHovered, currentIndex]);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-black/70 min-h-screen font-poppins text-white">
      <header className="text-center my-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">DAO For Good</h1>
        <p className="text-lg md:text-2xl">Empowering communities through decentralized funding</p>
      </header>

      {/* Slideshow Section */}
      <section
        className="relative w-full max-w-4xl max-h-[calc(100vh-100px)] h-full md:h-96 mb-10 overflow-hidden rounded-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-white/80 hover:text-black transition duration-300"
        >
          ❮
        </button>
        <img
          src={images[currentIndex]}
          alt="Slideshow"
          className="w-full h-full object-cover rounded-lg transition duration-500"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold">DAO for Good</h2>
          <p className="text-md md:text-lg mt-2">Empowering communities through decentralized funding</p>
        </div>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-white/80 hover:text-black transition duration-300"
        >
          ❯
        </button>
      </section>

      <section className="text-center mb-10 px-10">
  <h2 className="text-2xl md:text-3xl font-semibold mb-6">Key Features</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg p-6 shadow-xl transition-transform transform hover:scale-105 text-white">
      <div className="flex items-center mb-4">
        <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v4.586l2.293-2.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 7.586V3a1 1 0 011-1z" />
          <path fillRule="evenodd" d="M4 6a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V7a1 1 0 00-1-1H4zm0 2h12v8H4V8z" clipRule="evenodd" />
        </svg>
        <h3 className="text-xl font-semibold">Transparent Governance</h3>
      </div>
      <p>Blockchain ensures a transparent governance structure.</p>
    </div>
    
    <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-lg p-6 shadow-xl transition-transform transform hover:scale-105 text-white">
      <div className="flex items-center mb-4">
        <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v4.586l2.293-2.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 7.586V3a1 1 0 011-1z" />
          <path fillRule="evenodd" d="M4 6a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V7a1 1 0 00-1-1H4zm0 2h12v8H4V8z" clipRule="evenodd" />
        </svg>
        <h3 className="text-xl font-semibold">Democratic Voting</h3>
      </div>
      <p>Enable fair and democratic voting for project funding decisions.</p>
    </div>

    <div className="bg-gradient-to-r from-red-500 to-red-400 rounded-lg p-6 shadow-xl transition-transform transform hover:scale-105 text-white">
      <div className="flex items-center mb-4">
        <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v4.586l2.293-2.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 7.586V3a1 1 0 011-1z" />
          <path fillRule="evenodd" d="M4 6a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V7a1 1 0 00-1-1H4zm0 2h12v8H4V8z" clipRule="evenodd" />
        </svg>
        <h3 className="text-xl font-semibold">Real-time Tracking</h3>
      </div>
      <p>Track the movement of funds in real-time for transparency.</p>
    </div>

    <div className="bg-gradient-to-r from-purple-500 to-purple-400 rounded-lg p-6 shadow-xl transition-transform transform hover:scale-105 text-white">
      <div className="flex items-center mb-4">
        <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v4.586l2.293-2.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 7.586V3a1 1 0 011-1z" />
          <path fillRule="evenodd" d="M4 6a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V7a1 1 0 00-1-1H4zm0 2h12v8H4V8z" clipRule="evenodd" />
        </svg>
        <h3 className="text-xl font-semibold">Smart Contracts</h3>
      </div>
      <p>Automated fund distribution via smart contracts ensures fairness.</p>
    </div>
  </div>
</section>


      <section className="text-center mt-10">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 ml-4"
        >
          Sign Up
        </button>
      </section>

      <footer className="mt-10 text-center text-sm">
        <p>© 2024 DAO For Good. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
