//import PropTypes from 'prop-types'

// assets
import { assets } from '../../assets/assets';

// components
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
