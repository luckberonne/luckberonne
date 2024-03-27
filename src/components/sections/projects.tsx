'use client'
import React from 'react';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';

import Image from "next/image";
import projects from "./../../assets/projects.svg";
import { motion } from "framer-motion";


const Projects: React.FC = () => {
    const hobbies = [
        {
            titulo: 'TotalNews',
            subtitulo: 'Pagina de noticias Falsas',
            description: 'Pagina de noticias falsas generadas por IA.',
            chips: ['Next.js', 'PostgreSQL', 'Gemini API', 'Vercel'],
            pagina: 'https://totalnews.vercel.app/',
            github: 'https://github.com/luckberonne/totalnews'
        },
        {
            titulo: 'GenReadme',
            subtitulo: 'Genera un readme con IA',
            description: 'Genera un README.md con IA, extrayendo el packaje.json y los nombres de los achivos.',
            chips: ['Typescript', 'Gemini API', 'VSCODE Extension', 'Node.js'],
            pagina: '',
            github: 'https://github.com/luckberonne/genreadme'
        }
    ]

    return (
        <>
            <div>
                <h1 className="text-6xl">Hobby</h1>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-col-1 items-center justify-center">
                <div className="col-span-1 lg:mr-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {hobbies.map((hobby, index) => (
                        <motion.div
                         whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3 },
                          }}
                          whileTap={{ scale: 0.9 }} key={index} className="flex-grow">
                            <Card className="h-full flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle>{hobby.titulo}</CardTitle>
                                    <CardDescription>{hobby.subtitulo}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{hobby.description}</p>
                                    <div className="flex flex-wrap mt-4">
                                        {hobby.chips.map((chip, index) => (
                                            <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                                                {chip}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center">
                                    <div>
                                        {hobby.pagina && (
                                            <Link href={hobby.pagina} target="_blank">
                                                <Button>Abrir</Button>
                                            </Link>
                                        )}
                                    </div>
                                    <div>
                                        {hobby.github && (
                                            <Link href={hobby.github} target="_blank">
                                                <Button variant="outline">Repositorio</Button>
                                            </Link>
                                        )}
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
                <div className="col-span-1 hidden lg:block">
                    <div className="h-[35rem] w-[35rem] flex justify-center items-center">
                        <Image src={projects} alt="Projects" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Projects;
