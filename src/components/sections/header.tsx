'use client'
import { ModeToggle } from '../mode-toogle';
import React, { useState, useEffect } from 'react';

const scrollToBottom = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
};

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`sticky top-0 z-10 w-full ${scrolled ? 'rounded-b-md shadow-md' : ' bg-background'}`}>
            <div className='container mx-auto py-2'>
                <div className="flex justify-between items-center">
                    <a href="#about" onClick={scrollToBottom}>
                        <h1 className="text-2xl font-bold leading-tight">
                            Lucas Beronne
                        </h1>
                    </a>
                    <div>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
