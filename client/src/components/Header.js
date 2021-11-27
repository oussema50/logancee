import React from 'react'
import NavBar from './NavBar'

const Header = (props) => {
    const {toggleAdminMenu,setToggleAdminMenu} = props;
    return (
        <div>
            <NavBar toggleAdminMenu={toggleAdminMenu} setToggleAdminMenu={setToggleAdminMenu} />
        </div>
    )
}

export default Header
