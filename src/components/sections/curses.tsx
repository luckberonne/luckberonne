
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
        <>
            <div>
                <h1 className="text-6xl">Cursos</h1>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-col-1 items-center justify-center">
                <div className="col-span-1 hidden lg:block">
                    <div className="h-[35rem] w-[35rem] flex justify-center items-center">
                        <Image src={curse} alt="Curse" />
                    </div>
                </div>
                <div className="col-span-1 mr-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {experiences.map((experience, index) => (
                            <div key={index}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{experience.position}</CardTitle>
                                        <CardDescription>{experience.company}</CardDescription>
                                        <CardDescription>{experience.date}</CardDescription>
                                    </CardHeader>
                                    {/* <CardFooter className="flex justify-between">
                                        <Button>Titulo</Button>
                                    </CardFooter> */}
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Curses;