"use client";

import React from 'react';
import PropTypes from "prop-types";

const MenuItems = ({ onClick, label}) => {
    return (
        <div onClick={onClick} className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold z-10` }>
            {label}
        </div>
    );
}

MenuItems.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default MenuItems;
