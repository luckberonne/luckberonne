'use client'
import React from 'react';

const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="fixed bottom-4 right-4">
            {/* Contenido del Footer */}
            <button 
                onClick={scrollToTop}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-opacity duration-300 ease-in-out opacity-50 hover:opacity-100"
            >
                ↑
            </button>
        </div>
    );
};

export default Footer;
