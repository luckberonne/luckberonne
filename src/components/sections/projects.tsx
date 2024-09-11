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
import projectsImage from "./../../assets/projectsImage.svg";
import { motion } from "framer-motion";


const Projects: React.FC = () => {
    const projects = [
        {
            titulo: 'Kytame',
            subtitulo: 'Puntaje de taekwondo',
            description: 'Puntaje de taekwondo para torneos.',
            chips: ['Blazor', 'SignalR', '.NET 8', 'Azure'],
            pagina: 'https://kytame.azurewebsites.net/',
            github: 'https://github.com/luckberonne/Kytame'
        },
        {
            titulo: 'Casa Minka',
            subtitulo: 'Pagina de museo virtual',
            description: 'Pagina de museo virtual de cultura Japonesa.',
            chips: ['Next.js', 'PostgreSQL', 'Vercel'],
            pagina: 'https://casaminka.vercel.app/',
            github: ''
        },
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
        },
        {
            titulo: 'Generador de modelos SP',
            subtitulo: 'Genera modelos a partir de los sps de una base de datos',
            description: 'Genera modelos a partir de los sps de una base de datos, para ser usados en un proyecto .NET.',
            chips: ['.NET', 'API REST', 'Swagger'],
            pagina: '',
            github: 'https://github.com/luckberonne/GeneradorModelosAPI'
        },
        {
            titulo: 'CapitanKrik',
            subtitulo: 'Automatización de tareas Testing',
            description: 'Automatización de tareas Testing para la lectura y subida de archivos FTP.',
            chips: ['.NET', 'WPF', 'Windows app', 'Firebase', 'SQL Server'],
            pagina: '',
            github: 'https://github.com/luckberonne/CapitanKrik'
        }
    ]

    return (
        <div>
            <div>
                <h1 className="text-6xl mb-4">Proyectos</h1>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-col-1 items-center justify-center">
                <div className="col-span-1 lg:mr-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {projects.map((project, index) => (
                        <motion.div
                         whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3 },
                          }}
                          whileTap={{ scale: 0.9 }} key={index} className="flex-grow">
                            <Card className="h-full flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle>{project.titulo}</CardTitle>
                                    <CardDescription>{project.subtitulo}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{project.description}</p>
                                    <div className="flex flex-wrap mt-4">
                                        {project.chips.map((chip, index) => (
                                            <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                                                {chip}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center">
                                    <div>
                                        {project.pagina && (
                                            <Link href={project.pagina} target="_blank">
                                                <Button>Abrir</Button>
                                            </Link>
                                        )}
                                    </div>
                                    <div>
                                        {project.github && (
                                            <Link href={project.github} target="_blank">
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
                    <div className="p-8 flex justify-center items-center">
                        <Image src={projectsImage} alt="Projects" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
