'use client';
import React, { useState } from 'react';
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
import cursesImage from "./../../assets/cursesImage.svg";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import { Certificate } from 'crypto';

const Curses: React.FC = () => {
    const cursesPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const curses = [
        {
            company: 'AACI – ASOSIACION DE CULTURA INGLESA',
            position: 'INGLES - INTERMEDIATE (B2)',
            date: '(03/2021 – ACTUALIDAD)',
            description: ''
        },
        {
            company: 'Linkedin Learning',
            position: 'Azure: Introducción a la nube de Microsoft',
            date: 'VIRTUAL(09/2024)',
            description: '',
            certificate: 'https://www.linkedin.com/posts/lucas-beronne_certificate-of-completion-activity-7239613452590153729-8PfJ'
        },
        {
            company: 'Linkedin Learning',
            position: 'Azure: Microservicios avanzados para desarrollo .NET',
            date: 'VIRTUAL(08/2024)',
            description: '',
            certificate: 'https://www.linkedin.com/posts/lucas-beronne_certificate-of-completion-activity-7228861628375531521-X7yE'
        },
        {
            company: 'Linkedin Learning',
            position: 'Azure: Microservicios esencial',
            date: 'VIRTUAL(06/2024)',
            description: '',
            certificate: 'https://www.linkedin.com/posts/lucas-beronne_microservicios-microsoftazure-activity-7203565102707412992-LBPq'
        },
        {
            company: 'Linkedin Learning',
            position: 'Fundamentos de DevOps: Contenedores',
            date: 'VIRTUAL(05/2024)',
            description: '',
            certificate: 'https://www.linkedin.com/posts/lucas-beronne_contenedorizaciaejn-activity-7187649312900726785-P-qu'
        },
        {
            company: 'Linkedin Learning',
            position: 'DevOps esencial',
            date: 'VIRTUAL(04/2024)',
            description: '',
            certificate: 'https://www.linkedin.com/posts/lucas-beronne_devops-activity-7185498013417562112-PoPa'
        },
        {
            company: 'Linkedin Learning',
            position: 'Java avanzado 2',
            date: 'VIRTUAL(04/2024)',
            description: '',
            certificate: 'https://www.linkedin.com/posts/lucas-beronne_certificate-of-completion-activity-7181769181283893248-DSsp'
        },
        {
            company: 'I.T.B.A. - Instituto Tecnológico',
            position: 'CiberSeguridad y Ethical Hacking',
            date: 'VIRTUAL(07/2023 – 11/2023)',
            description: '',
            certificate: 'https://certtun.vottun.com/badgedetail?id=1cfdbcfc-a63e-46f1-a1c0-f978dd5fd15c'
        },
        {
            company: 'U.T.N. - Centro e-learning',
            position: 'DevOps, integración y agilidad continua',
            date: 'VIRTUAL(07/2023 – 09/2023)',
            description: '',
            certificate: 'https://www.linkedin.com/posts/lucas-beronne_activity-7143240537830076417-AFr2'
        },
        {
            company: 'U.T.N. (F.R.B.A)-GOB (Ministerio de educación)',
            position: '111mil - Curso de JAVA con SQL',
            date: '(03/2019 – 10/2020)',
            description: ''
        }
    ]

    const indexOfLastCurse = currentPage * cursesPerPage;
    const indexOfFirstCurse = indexOfLastCurse - cursesPerPage;
    const currentCurses = curses.slice(indexOfFirstCurse, indexOfLastCurse);

    const totalPages = Math.ceil(curses.length / cursesPerPage);

    const nextPage = () => {
        setCurrentPage(currentPage === totalPages ? currentPage : currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
    };

    return (
        <div>
            <div>
                <h1 className="text-6xl mb-4">Cursos</h1>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-col-1 items-center">
                <div className="col-span-1 hidden lg:block">
                    <div className=" p-10 flex justify-center items-center">
                        <Image src={cursesImage} alt="Curses" />
                    </div>
                </div>
                <div className="col-span-1 lg:mr-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {currentCurses.map((curse, index) => (
                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.3 },
                                }}
                                whileTap={{ scale: 0.9 }}
                                key={index}
                            >
                                <Card className="h-full flex flex-col justify-between">
                                    <CardHeader>
                                        <CardTitle>{curse.position}</CardTitle>
                                        <CardDescription>{curse.company}</CardDescription>
                                        <CardDescription>{curse.date}</CardDescription>
                                    </CardHeader>
                                    <CardFooter className="flex justify-between">
                                        {curse.certificate && (
                                            <Link href={curse.certificate} target="_blank">
                                                <Button >Certificado</Button>
                                            </Link>
                                        )}
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-4 gap-2 flex justify-center">
                        <Button variant="outline" onClick={prevPage} disabled={currentPage === 1} className='border-2'>
                            <IoIosArrowBack />
                        </Button>
                        <Button variant="outline" onClick={nextPage} disabled={currentPage === totalPages} className='border-2'>
                            <IoIosArrowForward />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Curses;
