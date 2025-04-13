"use client";

import { useState } from "react";
import { Info, MapPin, ChevronDown, LocateFixed } from "lucide-react";

export default function HeatMap() {
  const cityOptions = {
    current: { label: "📍 Use My Current Location", image: "/images/pic7.png" },
    monroe: { label: "Monroe, LA", image: "/images/monroe.png" },
    westmonroe: { label: "West Monroe, LA", image: "/images/westmonroe.png" },
    shreveport: { label: "Shreveport, LA", image: "/images/shreveport.png" },
    batonrouge: { label: "Baton Rouge, LA", image: "/images/baton.png" },
  };

  const addressOptions = {
    monroe: [
      { key: "spurgeon", label: "4007 Spurgeon Drive", image: "/images/spurgeon.png" },
      { key: "warhawk", label: "Warhawk Way", image: "/images/desiard.png" },
    ],
    westmonroe: [
      { key: "wm1", label: "Thomas Road", image: "/images/pic8.png" },
      { key: "wm2", label: "Natchitoches St", image: "/images/pic9.png" },
    ],
    shreveport: [
      { key: "sh1", label: "Line Avenue", image: "/images/pic10.png" },
      { key: "sh2", label: "Youree Drive", image: "/images/pic11.png" },
    ],
    batonrouge: [
      { key: "br1", label: "College Drive", image: "/images/pic12.png" },
      { key: "br2", label: "Government Street", image: "/images/pic13.png" },
    ],
  };

  const [activeCity, setActiveCity] = useState("monroe");
  const [activeAddress, setActiveAddress] = useState("");

  const handleCityChange = (e) => {
    const city = e.target.value;
    setActiveCity(city);
    setActiveAddress(""); // reset address when city changes
  };

  const getCurrentImage = () => {
    if (activeCity === "current") return cityOptions.current.image;
    const cityAddresses = addressOptions[activeCity] || [];
    const selectedAddress = cityAddresses.find((addr) => addr.key === activeAddress);
    return selectedAddress ? selectedAddress.image : cityOptions[activeCity].image;
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">City & Location Heatmap</h1>
          <p className="text-gray-600">Select a city, specific area, or your current location to view accident zones.</p>
        </div>

        {/* City and Address Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4">
          {/* City Dropdown */}
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-sm font-medium text-gray-700 mb-1">Choose a City</label>
            <div className="relative">
              <select
                value={activeCity}
                onChange={handleCityChange}
                className="w-full appearance-none bg-white border border-gray-300 text-gray-800 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              >
                {Object.entries(cityOptions).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute top-2.5 right-3 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Address Dropdown */}
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-sm font-medium text-gray-700 mb-1">Specific Address</label>
            <div className="relative">
              <select
                value={activeAddress}
                onChange={(e) => setActiveAddress(e.target.value)}
                disabled={activeCity === "current"}
                className={`w-full appearance-none border py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring ${
                  activeCity === "current" ? "bg-gray-100 cursor-not-allowed text-gray-400" : "bg-white border-gray-300 text-gray-800"
                }`}
              >
                <option value="">-- General City View --</option>
                {(addressOptions[activeCity] || []).map(({ key, label }) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <ChevronDown className="absolute top-2.5 right-3 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Image Display */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center">
                <img
                  src={getCurrentImage()}
                  alt="Selected Location"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Report Card */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-start mb-4">
                <div className="mr-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Report an Accident</h3>
                  <p className="text-gray-600 text-sm">Help make our roads safer by reporting accidents and hazards.</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors">
                Start New Report
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex">
              <div className="mr-3">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-1">About the Heatmap</h3>
                <p className="text-sm text-blue-700">
                  This view displays city-level and address-specific visuals based on accident and hazard reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
