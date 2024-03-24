import { ModeToggle } from '../mode-toogle';

const Header: React.FC = () => {
    return (
        <header className='sticky'>
            <div className='container mx-auto py-2'>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold leading-tight">
                        Lucas Beronne
                    </h1>
                    <div>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;