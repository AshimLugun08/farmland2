"use client"
// ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="relative card bg-white flex flex-col text-gray-700 shadow-md bg-clip-border rounded-xl cursor-pointer w-60 mx-auto">
            <div className="relative h-40 mx-4 pt-6 flex items-center justify-center text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                <Icon size="3em" className="text-gray-600" />
            </div>
            <div className="flex flex-col items-center justify-center p-4 h-full">
                <h2 className="card-title text-xl font-semibold justify-center text-blue-gray-900">{title}</h2>
                <p className="text-base font-light leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

export default ServiceCard;
