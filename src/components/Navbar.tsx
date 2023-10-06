import {useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ReduxTypes, UserTypes} from "../types";
import {useSelector} from "react-redux";

const Navbar = () => {
    const nav: NavigateFunction = useNavigate()
    const buttons: string[] = ['Profile', 'Messages', 'Posts', 'Users']
    const [selectedButton, setSelectedButton] = useState<string>('Profile')
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxStates) => state.states.user)
    function buttonClicked (item: string): void{
        nav(`/${item}`)
        setSelectedButton(item)
    }
    function logout (): void{
        nav('/login')
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
    }
    return (
        <div className='navbar-custom'>
            {user && <div className='username-display'>{user.username}</div>}
            <div className='d-flex'>
                {buttons.map((item: string) =>
                    <div key={item} className={`px-4 ${item === selectedButton ? 'active-nav-button' : 'nav-button'}`}
                         onClick={() => buttonClicked(item)}>
                        {item}
                    </div>
                )}
            </div>
            <div className='logout' onClick={logout}>Log out</div>
        </div>
    );
};

export default Navbar;