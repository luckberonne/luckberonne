
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

const Projects: React.FC = () => {
    const experiences = [
        {
            company: 'Pagina de noticias Falsas',
            position: 'TotalNews',
            date: '2020 - 2021',
            description: 'Pagina de noticias falsas generadas por IA'
        }
    ]

    return (
        <>
            <div>
                <h1 className="text-6xl">Hobby</h1>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-col-1 items-center justify-center">
                <div className="col-span-1 mr-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {experiences.map((experience, index) => (
                            <div key={index}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{experience.position} - {experience.company}</CardTitle>
                                        <CardDescription>{experience.date}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{experience.description}</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Link href="https://totalnews.vercel.app/" target="_blank">
                                            <Button>Abrir</Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
                    </div>
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