import { useEffect } from 'react';
import logo from '../assets/logo.png';
import '../styles/Navbar.css'
import feather from 'feather-icons'

const Navbar = () => {

  useEffect(() => {
    feather.replace()
  }, []);

  return (

  <div className='nav-theme'>

    
    <div className="header">  
  <div className="header-logo">
    <img src={logo} alt="Logo" className='logo' />
  </div>
  <nav className="navbar">
    <ul className="navbar-menu">
      <li className="navbar-item">
        <a href="#" className="navbar-link"><i data-feather="home"></i><span>Home</span> </a>
      </li>
      <li className="navbar-item">
        <a href="#" className="navbar-link"><i data-feather="message-square"></i><span>Messages</span></a>        
      </li>
      <li className="navbar-item">
        <a href="#" className="navbar-link"><i data-feather="users"></i><span>Customers</span></a>        
      </li>
      <li className="navbar-item">
        <a href="#" className="navbar-link"><i data-feather="folder"></i><span>Projects</span></a>        
      </li>
      <li className="navbar-item">
        <a href="#" className="navbar-link"><i data-feather="archive"></i><span>Resources</span></a>        
      </li>
      <li className="navbar-item">
        <a href="#" className="navbar-link"><i data-feather="help-circle"></i><span>Help</span></a>        
      </li>
      <li className="navbar-item">
        <a href="#" className="navbar-link"><i data-feather="settings"></i><span>Settings</span></a>        
      </li>
    </ul>
  </nav>
</div>

</div>
  )
}

export default Navbar