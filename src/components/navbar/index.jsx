import React, {useEffect, useState} from 'react';
import './navbar.css'

const NavBar = () =>{
    const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : undefined)
    useEffect(() => {}, [user]);
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        setUser(undefined);
    }
    return(
        <div>
            <nav className="Nav">
        
                <div className="NavMenu">
                    <a className="NavLink" href="/" activeStyle>
                        Expense Tracker
                    </a>
                    <span className="NavLink" activeStyle>
                        UserName
                    </span>
                </div>
                <nav className="NavBtn">
                    {
                        !user ? <a className="NavBtnLink" href='/login'>Login</a>
                        :<button onClick={handleLogout} className="NavBtnLink">Logout</button>
                    }
                    
                </nav>
            </nav>
        </div>
    )
}

export default NavBar;