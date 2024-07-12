import clsx from "clsx";
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
const NavLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
}
export default function Navigation() {
    return (
        <header className={css.header}>
            <nav className={css.nav}>
            <NavLink to = "/" className={NavLinkClass}>Home</NavLink>
            <NavLink to="/movies" className={NavLinkClass} >Movies</NavLink>
            </nav>
    </header> 
    );
}