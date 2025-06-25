import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import backgroundImage from '../../public/rustic-wooden.jpg'; 

const VerticalNavbar = styled('div')({
  width: '100vw', 
  height: '100vh',
  padding: '20px',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
});

const Title = styled('div')({
  fontSize: '30px', 
  fontWeight: 'bold',
  marginBottom: '20px',
});

const NavItem = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  padding: '10px 20px', 
  width: '250px', 
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const DropdownContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', 
  width: '100%', 
});

const DropdownItem = styled('div')({
  padding: '10px 20px', 
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

const StyledLink = styled(Link)({
  display: 'flex',
  color: '#fff',
  textDecoration: 'none',
  fontSize: '18px', 
  padding: '10px',
  alignItems: 'flex-start'
});

const Dropdown = ({ title, items }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  return (
    <NavItem onClick={toggleDropdown}>
      {title}&nbsp;
      <ArrowDropDownIcon fontSize="large" />
      {isVisible && (
        <DropdownContent>
          {items.map((item, index) => (
            <DropdownItem key={index}>
              <StyledLink to={item.path}>{item.label}</StyledLink>
            </DropdownItem>
          ))}
        </DropdownContent>
      )}
    </NavItem>
  );
};

const OwnerHome = () => {
 

  const menuItems = [
    { label: 'ADD', path: '/add' },
    { label: 'UPDATE', path: '/updatemenuowner' },
  ];

  const managerItems = [
    { label: 'ADD MANAGER', path: '/addmanager' },
    { label: 'UPDATE MANAGER', path: '/updatemanager' },
    { label: 'VIEW MANAGER', path: '/viewmanager' },
  ];

  return (
    <VerticalNavbar>
      <Title>DELICIOUS BYTES</Title>
      <Dropdown title="ITEM" items={menuItems} />
      <Dropdown title="MANAGER" items={managerItems} />
      
        <StyledLink to="/viewmenu">VIEW MENU</StyledLink>
      
        <StyledLink to="/">LOGOUT</StyledLink>
      
    </VerticalNavbar>
  );
};

export default OwnerHome;
