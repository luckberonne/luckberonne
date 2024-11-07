'use client'
import React from 'react';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import experience from "./../../assets/experience.svg";
import { motion } from "framer-motion";


const Experience: React.FC = () => {
    const experiences = [
        {
            company: 'Banco Galicia',
            link: 'https://www.galicia.ar/personas/',
            position: 'Developer .NET',
            date: '2024 - ACTUALIDAD',
            description: ""
        },
        {
            company: 'PlanexWare S.A.',
            link: 'https://www.planexware.com/',
            position: 'SSr Fullstack Developer',
            date: '2022 - 2024',
            description: "Tareas realizadas:\n• Realizar documentación Técnica.\n• Definición de arquitectura y desarrollo de APIs REST\n• Tickets CRM.\n• Desarrollo de Procesos en .net.\n• Capacitación desarrolladores jr.\n• Investigación e implementación de nuevas Tecnologías."
        },
        {
            company: 'PlanexWare S.A.',
            link: 'https://www.planexware.com/',
            position: 'Jr Fullstack Developer',
            date: '2021 - 2022',
            description: "Tareas realizadas:\n • Desarrollo de APIs REST y Páginas Webs con Angular.\n • Migración de soluciones LEGACY.\n • Creación y modificación de SPs (SQL SERVER).\n • Alta de datos en Tablas (SQL SERVER).\n • Automatización de tareas."
        },
        {
            company: 'PlanexWare S.A.',
            link: 'https://www.planexware.com/',
            position: 'QA Tester',
            date: '2019 - 2021',
            description: "Tareas realizadas:\n • Diseñar plan de pruebas.\n • Realizar diversas pruebas (unitarias, regresión, estrés y integración).\n • Registrar resultados Azure."
        }

    ]

    return (
        <div>
            <div>
                <h1 className="text-6xl mb-4">Experiencia</h1>
            </div>

            <div className="grid lg:grid-cols-2 md:grid-col-1 items-center">
                <div className="col-span-1 lg:mr-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {experiences.map((experience, index) => (
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 },
                            }}
                            whileTap={{ scale: 0.9 }} key={index} className="flex-grow">
                            <Card className="h-full flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle>{experience.position}</CardTitle>
                                    <CardDescription>
                                        <a href={experience.link} target="_blank" rel="noopener noreferrer">{experience.company}</a>
                                    </CardDescription>
                                    <CardDescription>{experience.date}</CardDescription>
                                </CardHeader>
                                <CardFooter className="flex justify-between">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>Tareas Realizadas</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>{experience.position}</DialogTitle>
                                                <DialogDescription>
                                                    {experience.description.split('\n').map((line, index) => (
                                                        <div key={index}>{line}</div>
                                                    ))}
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
                <div className="col-span-1 hidden lg:block">
                    <div className=" p-8 flex justify-center items-center">
                        <Image src={experience} alt="Experience" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;