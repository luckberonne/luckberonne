'use client'
import React from 'react';
import { FaAngular, FaCss3, FaDownload, FaHtml5, FaJava, FaPython, FaVuejs } from 'react-icons/fa';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { SiCsharp, SiExpress, SiMicrosoftsqlserver, SiMysql, SiNestjs, SiNextdotjs } from 'react-icons/si';
import { RiJavascriptLine } from 'react-icons/ri';
import { TbSql } from 'react-icons/tb';
import { BiLogoPostgresql, BiLogoSpringBoot } from 'react-icons/bi';
import { IoLogoFirebase } from 'react-icons/io5';

import Image from "next/image";
import skill from "./../../assets/skill.svg";
import { motion } from "framer-motion";



const Skills: React.FC = () => {
    //agregar esto a un json
    const skills = [
        {
            name: 'Lenguajes',
            items: [
                {
                    name: 'C#',
                    level: 'Avanzado',
                    color: 'blue',
                    icon: <SiCsharp size={24} />
                },
                {
                    name: 'Java',
                    level: 'Intermedio',
                    color: 'red',
                    icon: <FaJava size={24} />
                },
                {
                    name: 'JavaScript',
                    level: 'Intermedio',
                    color: 'orange',
                    icon: <RiJavascriptLine size={24} />
                },
                {
                    name: 'Python',
                    level: 'Basico',
                    color: 'green',
                    icon: <FaPython size={24} />
                },
                {
                    name: 'SQL',
                    level: 'Avanzado',
                    color: 'purple',
                    icon: <TbSql size={24} />
                },
                {
                    name: 'HTML',
                    level: 'Advanzado',
                    color: 'lightblue',
                    icon: <FaHtml5 size={24} />
                },
                {
                    name: 'CSS',
                    level: 'Intermedio',
                    color: 'orange',
                    icon: <FaCss3 size={24} />
                },
            ]
        },
        {
            name: 'Frontend Frameworks',
            items: [
                {
                    name: 'Next JS',
                    level: 'Basico',
                    color: 'blue',
                    icon: <SiNextdotjs size={24} />
                },
                {
                    name: 'Angular',
                    level: 'Avanzado',
                    color: 'red',
                    icon: <FaAngular size={24} />
                },
            {
                name: 'Blazor',
                level: 'Intermedio',
                color: 'purple',
                icon: <SiCsharp size={24} />
            },
            {
                name: 'ASP.NET',
                level: 'Avanzado',
                color: 'blue',
                icon: <SiCsharp size={24} />
            }
            ]
        },
        {
            name: 'Backend Frameworks',
            items: [
                {
                    name: '.NET Core',
                    level: 'Avanzado',
                    color: 'gray',
                    icon: <SiCsharp size={24} />
                },
                {
                    name: 'Java',
                    level: 'Basico',
                    color: 'red',
                    icon: <FaJava size={24} />
                }
            ]
        },
        {
            name: 'Base de Datos',
            items: [
                {
                    name: 'SQL Server',
                    level: 'Avanzado',
                    color: 'green',
                    icon: <SiMicrosoftsqlserver size={24} />
                },
                {
                    name: 'MySQL',
                    level: 'Intermedio',
                    color: 'orange',
                    icon: <SiMysql size={24} />
                },
                {
                    name: 'PostgreSQL',
                    level: 'Intermedio',
                    color: 'blue',
                    icon: <BiLogoPostgresql size={24} />
                },
                {
                    name: 'Firebase',
                    level: 'Basico',
                    color: 'yellow',
                    icon: <IoLogoFirebase size={24} />
                }
            ]
        },
    ];

    return (
        <div>
            <div>
                <h1 className="text-6xl mb-4">Skills</h1>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-col-1 items-center justify-center">
                <div className="col-span-1 hidden lg:block">
                    <div className="p-8 flex justify-center items-center">
                        <Image src={skill} alt="Skill" />
                    </div>
                </div>
                <div className="col-span-1 grid-rows-4">
                    {skills.map((skill, index) => (
                        <div className="row-span-1" key={index}>
                            <h2 className="text-2xl my-3">{skill.name}</h2>

                            <div>
                                <ul className="flex flex-wrap gap-3">
                                    {skill.items.map((item, index) => (
                                        <motion.li key={index}
                                            whileHover={{
                                                scale: 1.05,
                                                transition: { duration: 0.3 },
                                            }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="flex justify-center items-center h-14 w-14 rounded-md" style={{ backgroundColor: item.color }}>
                                                            {item.icon}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{item.name} - {item.level}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div>
    );
};

export default Skills;