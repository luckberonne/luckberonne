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
import Image from "next/image";
import curse from "./../../assets/curse.svg";
import { motion } from "framer-motion";



const Curses: React.FC = () => {
    const experiences = [
        {
            company: 'I.T.B.A. - Instituto Tecnológico',
            position: 'CiberSeguridad y Ethical Hacking',
            date: 'VIRTUAL(07/2023 – 11/2023)',
            description: ''
        },
        {
            company: 'U.T.N. - Centro e-learning',
            position: 'DevOps, integración y agilidad continua',
            date: 'VIRTUAL(07/2023 – 09/2023)',
            description: ''
        },
        {
            company: 'AACI – ASOSIACION DE CULTURA INGLESA',
            position: 'INGLES - PRE INTERMEDIATE',
            date: '(03/2021 – ACTUALIDAD)',
            description: ''
        },
        {
            company: 'U.T.N. (F.R.B.A)-GOB (Ministerio de educación)',
            position: '111mil - Curso de JAVA con SQL',
            date: '(03/2019 – 10/2020)',
            description: ''
        }
    ]

    return (
        <div>
            <div>
                <h1 className="text-6xl mb-4">Cursos</h1>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-col-1 items-center justify-center">
                <div className="col-span-1 hidden lg:block">
                    <div className=" p-10 flex justify-center items-center">
                        <Image src={curse} alt="Curse" />
                    </div>
                </div>
                <div className="col-span-1 lg:mr-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {experiences.map((experience, index) => (
                            <motion.div
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 },
                            }}
                            whileTap={{ scale: 0.9 }} key={index}>
                            <Card className="h-full flex flex-col justify-between">
                                    <CardHeader>
                                        <CardTitle>{experience.position}</CardTitle>
                                        <CardDescription>{experience.company}</CardDescription>
                                        <CardDescription>{experience.date}</CardDescription>
                                    </CardHeader>
                                    {/* <CardFooter className="flex justify-between">
                                        <Button>Titulo</Button>
                                    </CardFooter> */}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Curses;