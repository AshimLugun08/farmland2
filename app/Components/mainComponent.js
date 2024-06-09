// MainComponent.jsx
"use client"
import React from 'react';
import ServiceCard from "@/app/Components/ServiceCard";
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { IoTimerOutline } from 'react-icons/io5';
import { CiDeliveryTruck } from 'react-icons/ci';
import { TbTruckReturn } from 'react-icons/tb';

const MainComponent = () => {
    return (
        <div className="bg-gray-200 mt-6 mr-40 rounded-t-3xl">
            <h1 className="text-3xl m-6 font-serif font-medium mb-6">Our Services</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ServiceCard
                    icon={MdOutlineProductionQuantityLimits}
                    title="Quality"
                    description="You can trust"
                />
                <ServiceCard
                    icon={IoTimerOutline}
                    title="On time"
                    description="Guarantee"
                />
                <ServiceCard
                    icon={CiDeliveryTruck}
                    title="Free"
                    description="Delivery"
                />
                <ServiceCard
                    icon={TbTruckReturn}
                    title="Return Policy"
                    description="No Questions asked"
                />
            </div>
        </div>
    );
};

export default MainComponent;
