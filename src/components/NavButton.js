import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLink = styled(Link)`
    text-decoration: none;
    color: #fff;
    background-color: #ed2891;
    min-width: 120px;
    box-sizing: border-box;
    padding: 8px;
    border-radius: 8px;
    font-size: 1rem;
    text-align: center;
    &:hover {
        background-color: #F344A1;
    }
    ${props => props.styles}

`

const NavButton = ({text, path, styles}) => {
    return (
        <NavLink styles={styles} to={path}>{text}</NavLink>
    );
}

NavButton.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    styles: PropTypes.object
}

export default NavButton;