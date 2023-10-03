import * as React from 'react';
import {useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

const Navbar = () => {
    const nav: NavigateFunction = useNavigate()
    const buttons: string[] = ['Profile', 'Messages', 'Posts', 'Users']
    const [selectedButton, setSelectedButton] = useState<string>('Profile')
    function buttonClicked (item): void{
        nav(`/${item}`)
        setSelectedButton(item)
    }
    function logout (): void{
        nav('/login')
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
    }
    return (
        <div className='d-flex justify-content-around p-3'>
            {buttons.map((item: string) =>
                <button key={item} className={`btn px-4 ${item === selectedButton ? 'btn-success' : 'btn-primary'}`}
                        onClick={() => buttonClicked(item)}>
                    {item}
                </button>
            )}
            <button onClick={logout}>Log out</button>
        </div>
    );
};

export default Navbar;