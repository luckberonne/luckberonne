'use client'
import React from 'react';
import { FaDownload, FaGithub, FaLinkedin, FaLinkedinIn } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import Typewriter from 'typewriter-effect';
import Image from "next/image";
import landing from "./../../assets/landing.svg";



const IAM: React.FC = () => {
    return (
        <div className="grid lg:grid-cols-2 md:grid-col-1 gap-4 items-center justify-center">
            <div className="col-span-1 grid-rows-4">
                <div className="row-span-2 my-4">
                    <h1 className="text-7xl">
                        Hola, soy
                    </h1>
                    <h1 className="text-7xl">
                        Lucas Beronne
                    </h1>
                </div>
                <div className="row-span-1 min-h-10 text-xl">
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter.typeString('Desarrollador Full-Stack!')
                                .callFunction(() => {
                                    console.log('String typed out!');
                                })
                                .pauseFor(200)
                                .callFunction(() => {
                                    console.log('All strings were deleted');
                                })
                                .start();
                        }}
                    />
                </div>
                <div className="row-span-1 flex gap-4">
                    <div className="flex justify-center items-center h-14 w-14 rounded-md bg-blue-700">
                        <a href="https://www.linkedin.com/in/lucas-beronne/" target="_blank">
                            <FaLinkedin size={24} />
                        </a>
                    </div>
                    <div className="flex justify-center items-center h-14 w-14 rounded-md bg-red-700">
                        <a href="mailto:lucasberonne@gmail.com">
                            <SiGmail size={24} />
                        </a>
                    </div>
                    <div className="flex justify-center items-center h-14 w-14 rounded-md bg-gray-700">
                        <a href="https://github.com/luckberonne" target="_blank">
                            <FaGithub size={24} />
                        </a>
                    </div>
                    <div className="flex justify-center items-center h-14 w-14 rounded-md bg-green-700">
                        <a href="https://drive.google.com/file/d/1umllW_QBbVKjXxl1zO5o96THyfFX_ZVu/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                            <FaDownload size={24} />
                        </a>
                    </div>

                </div>
            </div>
            <div className="col-span-1 hidden lg:block">
                <div className="h-[35rem] w-[35rem]">
                    <Image src={landing} alt="Landing"/>
                </div>
            </div>
        </div>
    );
};

export default IAM;