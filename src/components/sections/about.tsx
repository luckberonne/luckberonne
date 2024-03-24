const About: React.FC = () => {
    return (
        <div className="grid lg:grid-cols-2 md:grid-col-1 gap-4 items-center justify-center">
            <div className="col-span-1"> 
                <h1 className="text-7xl">Sobre Mi</h1>
                <p>
                    Soy estudiante de Ingeniería en Sistemas De Información en la Universidad
                    Tecnológica Nacional. Me considero una persona responsable, social,
                    comprometido al emprender y ampliar mis conocimientos en el rubro IT.
                </p>

            </div>
            <div className="col-span-1">
                <p>imagaen</p>
            </div>
        </div>
    );
};

export default About;