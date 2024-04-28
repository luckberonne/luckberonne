'use client'
import React from 'react';
import { FaDownload, FaGithub, FaLinkedin, FaLinkedinIn } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import Typewriter from 'typewriter-effect';
import Image from "next/image";
import landing from "./../../assets/landing.svg";
import { motion } from "framer-motion";
import { Item } from './dataProvider';

const IAM: React.FC<{ title: string, items: Item[] }> = ({ title, items }) => {

    return (
        <div className="grid lg:grid-cols-2 md:grid-col-1 mt-16 gap-4 items-center justify-center">
            <div className="col-span-1 grid-rows-4">
                <div className="row-span-2 my-4">
                    <h1 className="text-7xl">
                        Hola, soy
                    </h1>
                    <h1 className="text-7xl">
                        {title}
                    </h1>
                </div>
                <div className="row-span-1 min-h-10 text-xl">
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter.typeString('Desarrollador Full-Stack!')
                                .start();
                        }}
                    />
                </div>
                <div className="row-span-1 flex gap-4">
                    {items.map((item, index) => (
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 },
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }} key={index} className="flex justify-center items-center h-14 w-14 rounded-md" style={{ backgroundColor: item.color }}>
                            <a href={item.link} target="_blank">
                                {item.icon}
                            </a>
                        </motion.div>
                    ))}


                </div>
            </div>
            <div className="col-span-1 hidden lg:block">
                <div className="h-[35rem] w-[35rem]">
                    <Image src={landing} alt="Landing" />
                </div>
            </div>
        </div>
    );
};

export default IAM;