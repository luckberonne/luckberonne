
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


const Curses: React.FC = () => {
    const experiences = [
        {
            company: 'Company 1',
            position: 'Frontend Developer',
            date: '2020 - 2021',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet urna consectetur, lacinia libero quis, tincidunt libero. Sed sit amet urna consectetur, lacinia libero quis, tincidunt libero.'
        },
        {
            company: 'Company 2',
            position: 'Backend Developer',
            date: '2019 - 2020',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet urna consectetur, lacinia libero quis, tincidunt libero. Sed sit amet urna consectetur, lacinia libero quis, tincidunt libero.'
        },
        {
            company: 'Company 3',
            position: 'Fullstack Developer',
            date: '2018 - 2019',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet urna consectetur, lacinia libero quis, tincidunt libero. Sed sit amet urna consectetur, lacinia libero quis, tincidunt libero.'
        }
    ]

    return (
        <div className="grid lg:grid-cols-2 md:grid-col-1 items-center justify-center">
            <div className="col-span-1 hidden lg:block">
                <div>
                    <h1 className="text-6xl">Cursos</h1>
                </div>
                <div className="h-[35rem] w-[35rem] flex justify-center items-center">
                </div>
            </div>
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
                                    {/* <p>{experience.description}</p> */}
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Deploy</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Curses;