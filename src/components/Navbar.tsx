import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = (): JSX.Element => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink activeClassName="active" className="nav-item nav-link" exact to="/">Home</NavLink>
          <NavLink activeClassName="active" className="nav-item nav-link" exact to="/episodes">Episodes</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;