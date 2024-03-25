
import React from 'react';
import { FaAngular, FaCss3, FaDownload, FaHtml5, FaJava, FaPython, FaVuejs } from 'react-icons/fa';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { SiCsharp, SiExpress, SiMicrosoftsqlserver, SiNestjs, SiNextdotjs } from 'react-icons/si';
import { RiJavascriptLine } from 'react-icons/ri';
import { TbSql } from 'react-icons/tb';
import { BiLogoPostgresql, BiLogoSpringBoot } from 'react-icons/bi';
import { IoLogoFirebase } from 'react-icons/io5';


const Skills: React.FC = () => {
    const skills = [
        {
            name: 'Lenguajes',
            items: [
                {
                    name: 'C#',
                    level: 'Advanzado',
                    color: 'blue',
                    icon: <SiCsharp size={24}/>
                },
                {
                    name: 'Java',
                    level: 'Intermedio',
                    color: 'red',
                    icon: <FaJava size={24}/>
                },
                {
                    name: 'JavaScript',
                    level: 'Intermedio',
                    color: 'orange',
                    icon: <RiJavascriptLine size={24}/>
                },
                {
                    name: 'Python',
                    level: 'Basico',
                    color: 'green',
                    icon: <FaPython size={24}/>
                },
                {
                    name: 'SQL',
                    level: 'Advanzado',
                    color: 'purple',
                    icon: <TbSql size={24}/>
                },
                {
                    name: 'HTML',
                    level: 'Advanzado',
                    color: 'lightblue',
                    icon: <FaHtml5 size={24}/>
                },
                {
                    name: 'CSS',
                    level: 'Intermedio',
                    color: 'orange',
                    icon: <FaCss3  size={24}/>
                },
            ]
        },
        {
            name: 'Frontend Frameworks',
            items: [
                {
                    name: 'Next JS',
                    level: 'Intermedio',
                    color: 'blue',
                    icon: <SiNextdotjs size={24}/>
                },
                {
                    name: 'Angular',
                    level: 'Advanzado',
                    color: 'red',
                    icon: <FaAngular size={24}/>
                },
                {
                    name: 'Vue',
                    level: 'Basico',
                    color: 'green',
                    icon: <FaVuejs size={24}/>
                },
            ]
        },
        {
            name: 'Backend Frameworks',
            items: [
                {
                    name: '.NET Core',
                    level: 'Advanzado',
                    color: 'gray',
                    icon: <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                    <title>NET core</title>
                    <defs>
                        <image  width="512" height="512" id="img1" href="data:image/png;base64,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"/>
                    </defs>
                    <style>
                    </style>
                    <use id="Background" href="#img1" x="0" y="0"/>
                </svg>
                },
                {
                    name: 'Express',
                    level: 'Intermedio',
                    color: 'blue',
                    icon: <SiExpress size={24}/>
                },
                {
                    name: 'Java',
                    level: 'Basico',
                    color: 'red',
                    icon: <FaJava size={24}/>
                },
                {
                    name: 'Firebase',
                    level: 'Intermedio',
                    color: 'yellow',
                    icon: <IoLogoFirebase size={24}/>
                },
                {
                    name: 'Nest JS',
                    level: 'Intermedio',
                    color: '#3f51b5',
                    icon: <SiNestjs size={24}/>
                },
            ]
        },
        {
            name: 'Base de Datos',
            items: [
                {
                    name: 'SQL Server',
                    level: 'Advanzado',
                    color: 'green',
                    icon: <SiMicrosoftsqlserver size={24}/>
                },
                {
                    name: 'MySQL',
                    level: 'Intermedio',
                    color: 'orange',
                    icon: <FaDownload size={24}/>
                },
                {
                    name: 'PostgreSQL',
                    level: 'Intermedio',
                    color: 'blue',
                    icon: <BiLogoPostgresql size={24}/>
                },
                {
                    name: 'Firebase',
                    level: 'Basico',
                    color: 'yellow',
                    icon: <IoLogoFirebase size={24}/>
                }
            ]
        },
    ];

    return (
        <>
                <div>
                    <h1 className="text-6xl">Skills</h1>
                </div>
        <div className="grid lg:grid-cols-2 md:grid-col-1 items-center justify-center">
            <div className="col-span-1 hidden lg:block">
                <div className="h-[35rem] w-[35rem] flex justify-center items-center">
                    <svg id="b6117b06-2b45-45bc-b789-4a82ab6612dd" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1139.17088 654.54324"><title>progressive_app</title><circle cx="246.82682" cy="521.76476" r="59.24334" fill="#f2f2f2" /><circle cx="256.45989" cy="513.095" r="59.24334" fill="#3f51b5" /><rect x="304.17137" y="447.54324" width="732.99951" height="2" fill="#111111" /><path d="M714.20735,141.38055H454.03775v-5.36232h-117.971v5.36232H74.82467a17.5985,17.5985,0,0,0-17.59852,17.59851V515.23125a17.59856,17.59856,0,0,0,17.59852,17.59858H714.20735a17.59856,17.59856,0,0,0,17.59852-17.59858V158.97906A17.5985,17.5985,0,0,0,714.20735,141.38055Z" transform="translate(-30.41456 -122.72838)" fill="#111111" /><rect x="50.4058" y="49.75362" width="627.3913" height="353.91304" fill="#3f51b5" /><circle cx="363.56522" cy="33.66667" r="6.43478" fill="#3f51b5" /><polygon points="498.374 403.667 50.406 403.667 50.406 49.754 498.374 403.667" opacity="0.1" /><circle cx="148.57375" cy="316.87641" r="60.3068" fill="#f2f2f2" /><rect x="509.95272" y="240.62175" width="58.6052" height="12.24586" fill="#111111" /><rect x="439.10165" y="145.27896" width="200.30733" height="5.24823" fill="#111111" /><rect x="439.10165" y="161.89834" width="200.30733" height="5.24823" fill="#111111" /><rect x="439.10165" y="178.51773" width="200.30733" height="5.24823" fill="#111111" /><rect x="439.10165" y="195.13711" width="200.30733" height="5.24823" fill="#111111" /><rect x="439.10165" y="211.7565" width="200.30733" height="5.24823" fill="#111111" /><rect x="614.91726" y="56.9338" width="24.49173" height="24.49173" fill="#f2f2f2" /><path d="M681.1947,215.52507h-29.74v-29.74h29.74Zm-28.44691-1.293h27.15387V187.07816H652.74779Z" transform="translate(-30.41456 -122.72838)" fill="#111111" /><path d="M749.42165,519.96024H688.19234v-4.41153a.87468.87468,0,0,0-.87471-.87471h-20.9929a.87468.87468,0,0,0-.87471.87471v4.41153H652.32945v-4.41153a.87467.87467,0,0,0-.8747-.87471H630.46184a.87468.87468,0,0,0-.8747.87471v4.41153H616.46657v-4.41153a.87468.87468,0,0,0-.8747-.87471H594.599a.87468.87468,0,0,0-.87471.87471v4.41153H580.60369v-4.41153a.87468.87468,0,0,0-.87471-.87471H558.73607a.87468.87468,0,0,0-.8747.87471v4.41153H544.7408v-4.41153a.87468.87468,0,0,0-.8747-.87471H522.87319a.87467.87467,0,0,0-.8747.87471v4.41153H508.87792v-4.41153a.87468.87468,0,0,0-.87471-.87471h-20.9929a.87468.87468,0,0,0-.87471.87471v4.41153H473.015v-4.41153a.87468.87468,0,0,0-.8747-.87471H307.69588a.87468.87468,0,0,0-.8747.87471v4.41153H293.70061v-4.41153a.87468.87468,0,0,0-.8747-.87471H271.833a.87467.87467,0,0,0-.8747.87471v4.41153H257.83773v-4.41153a.87468.87468,0,0,0-.87471-.87471h-20.9929a.87468.87468,0,0,0-.87471.87471v4.41153H221.97484v-4.41153a.87467.87467,0,0,0-.8747-.87471H200.10723a.87468.87468,0,0,0-.8747.87471v4.41153H186.112v-4.41153a.87468.87468,0,0,0-.8747-.87471H164.24435a.87468.87468,0,0,0-.87471.87471v4.41153H150.24908v-4.41153a.87468.87468,0,0,0-.87471-.87471H128.38146a.87468.87468,0,0,0-.8747.87471v4.41153H114.38619v-4.41153a.87468.87468,0,0,0-.8747-.87471H92.51858a.87467.87467,0,0,0-.8747.87471v4.41153H51.40747a20.99293,20.99293,0,0,0-20.99291,20.99291v9.4925A20.99291,20.99291,0,0,0,51.40747,571.4385H749.42165a20.9929,20.9929,0,0,0,20.99291-20.99285v-9.4925A20.99292,20.99292,0,0,0,749.42165,519.96024Z" transform="translate(-30.41456 -122.72838)" fill="#111111" /><path d="M193.58593,477.27162a76,76,0,1,1,76-76A76.08614,76.08614,0,0,1,193.58593,477.27162Zm0-150a74,74,0,1,0,74,74A74.08385,74.08385,0,0,0,193.58593,327.27162Z" transform="translate(-30.41456 -122.72838)" fill="#111111" /><rect x="586.17137" y="32.54324" width="254.99951" height="2" fill="#111111" /><rect x="406.17137" y="560.54324" width="732.99951" height="2" fill="#111111" /><rect x="192.67161" y="652.54324" width="254.99951" height="2" fill="#111111" /><rect x="471" y="550" width="28" height="28" fill="#3f51b5" /><path d="M546.41456,684.72838h-34v-34h34Zm-32.52174-1.47826H544.9363V652.20664H513.89282Z" transform="translate(-30.41456 -122.72838)" fill="#111111" /><rect x="796" y="22" width="28" height="28" fill="#3f51b5" /><path d="M871.41456,156.72838h-34v-34h34Zm-32.52174-1.47826H869.9363V124.20664H838.89282Z" transform="translate(-30.41456 -122.72838)" fill="#111111" /><rect x="1078" y="550" width="28" height="28" fill="#3f51b5" /><path d="M1153.41456,684.72838h-34v-34h34Zm-32.52174-1.47826h31.04348V652.20664h-31.04348Z" transform="translate(-30.41456 -122.72838)" fill="#111111" /><path d="M1087.58593,354.6866h-2.37862V289.525a37.71374,37.71374,0,0,0-37.71385-37.71377H909.44A37.71373,37.71373,0,0,0,871.72613,289.525V647.00639A37.71374,37.71374,0,0,0,909.44,684.72017h138.05348a37.71374,37.71374,0,0,0,37.71385-37.71378V401.06969h2.37862Z" transform="translate(-30.41456 -122.72838)" fill="#111111" /><path d="M1077.176,291.74159v356.96a28.16523,28.16523,0,0,1-28.16016,28.17H910.296a28.16511,28.16511,0,0,1-28.16-28.17v-356.96a28.163,28.163,0,0,1,28.16-28.16h16.83a13.3792,13.3792,0,0,0,12.39,18.43h79.09a13.37908,13.37908,0,0,0,12.38995-18.43h18.02A28.16308,28.16308,0,0,1,1077.176,291.74159Z" transform="translate(-30.41456 -122.72838)" fill="#3f51b5" /><rect x="928.57968" y="376.21769" width="41.32357" height="12.24586" fill="#111111" /><rect x="878.62133" y="280.8749" width="141.24028" height="5.24823" fill="#111111" /><rect x="878.62133" y="297.49429" width="141.24028" height="5.24823" fill="#111111" /><rect x="878.62133" y="314.11367" width="141.24028" height="5.24823" fill="#111111" /><rect x="878.62133" y="330.73306" width="141.24028" height="5.24823" fill="#111111" /><rect x="878.62133" y="347.35244" width="141.24028" height="5.24823" fill="#111111" /><rect x="929.68352" y="211.17873" width="24.49173" height="24.49173" fill="#f2f2f2" /><path d="M969.47386,340.03163v29.74h29.74v-29.74Zm28.45,28.45h-27.16v-27.16h27.16Z" transform="translate(-30.41456 -122.72838)" fill="#111111" /><path d="M1077.176,610.58162v38.12a28.16523,28.16523,0,0,1-28.16016,28.17H910.296a28.16511,28.16511,0,0,1-28.16-28.17v-192.21l116.87,92.33,2,1.58,21.74,17.17,2.03,1.61Z" transform="translate(-30.41456 -122.72838)" opacity="0.1" /><circle cx="937.24147" cy="498.70691" r="43.86783" fill="#f2f2f2" /><path d="M350.58593,777.27162a87,87,0,1,1,87-87A87.09858,87.09858,0,0,1,350.58593,777.27162Zm0-172a85,85,0,1,0,85,85A85.09629,85.09629,0,0,0,350.58593,605.27162Z" transform="translate(-30.41456 -122.72838)" fill="#111111" /><path d="M980.58593,655.27162a55,55,0,1,1,55-55A55.06223,55.06223,0,0,1,980.58593,655.27162Zm0-108a53,53,0,1,0,53,53A53.05963,53.05963,0,0,0,980.58593,547.27162Z" transform="translate(-30.41456 -122.72838)" fill="#111111" /></svg>
                </div>
            </div>
            <div className="col-span-1 grid-rows-4">
                {skills.map((skill, index) => (
                    <div className="row-span-1" key={index}>
                        <h2 className="text-2xl my-3">{skill.name}</h2>

                        <div>
                            <ul className="flex flex-wrap gap-3">
                                {skill.items.map((item, index) => (
                                    <li key={index}>
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
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div >
        </>
    );
};

export default Skills;