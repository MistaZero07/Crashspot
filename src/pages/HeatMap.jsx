"use client"

import { useState } from "react"
import { Info, MapPin } from "lucide-react"

export default function HeatMap() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedHotspot, setSelectedHotspot] = useState(null)

  const filterData = {
    all: { title: "All Accidents", total: 248, reduced: 32, percentage: 13 },
    recent: { title: "Recent Accidents (30 days)", total: 87, reduced: 12, percentage: 14 },
    severity: { title: "Accidents by Severity", total: 156, reduced: 43, percentage: 28 },
    fixed: { title: "Fixed Locations", total: 92, reduced: 78, percentage: 85 },
  }

  const hotspots = [
    { id: 1, x: 25, y: 30, size: 16, intensity: 0.8, name: "Main Street Intersection", before: 12, after: 3, reduction: 75 },
    { id: 2, x: 70, y: 60, size: 12, intensity: 0.6, name: "Riverside Drive Curve", before: 8, after: 1, reduction: 88 },
    { id: 3, x: 80, y: 20, size: 14, intensity: 0.7, name: "Oak Street School Zone", before: 5, after: 0, reduction: 100 },
  ]

  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(selectedHotspot?.id === hotspot.id ? null : hotspot)
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Accident Heatmap</h1>
          <p className="text-gray-600">View accident-prone areas across the city and see how safety improvements have reduced incidents.</p>
        </div>

        {/* Filter tabs */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-2">
            {Object.keys(filterData).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeFilter === filter ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {filterData[filter].title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Heatmap display */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div
                className="relative w-full h-[500px] bg-gray-100"
                style={{
                  backgroundImage: `url('/your-image-path.png')`, // replace with actual path
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {hotspots.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    className={`absolute rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                      selectedHotspot?.id === hotspot.id ? "ring-4 ring-yellow-400" : ""
                    }`}
                    style={{
                      top: `${hotspot.y}%`,
                      left: `${hotspot.x}%`,
                      width: `${hotspot.size * 2}px`,
                      height: `${hotspot.size * 2}px`,
                      backgroundColor: `rgba(220, 38, 38, ${hotspot.intensity})`,
                    }}
                    onClick={() => handleHotspotClick(hotspot)}
                    aria-label={`Hotspot: ${hotspot.name}`}
                  ></button>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-md shadow-md">
                  <div className="text-sm font-medium mb-2">Accident Density</div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-300"></div><span className="text-xs">Low</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div><span className="text-xs">Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-700"></div><span className="text-xs">High</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white p-4 border-t">
                <div className="flex flex-wrap gap-4 justify-around">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{filterData[activeFilter].total}</div>
                    <div className="text-sm text-gray-600">Total Incidents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{filterData[activeFilter].reduced}</div>
                    <div className="text-sm text-gray-600">Incidents Reduced</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{filterData[activeFilter].percentage}%</div>
                    <div className="text-sm text-gray-600">Reduction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {selectedHotspot && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{selectedHotspot.name}</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Before: {selectedHotspot.before} accidents/year</span>
                  <span className="text-green-600 text-sm">After: {selectedHotspot.after} accidents/year</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${selectedHotspot.reduction}%` }}
                  ></div>
                </div>
                <p className="text-gray-700 mb-4">
                  {selectedHotspot.name === "Main Street Intersection"
                    ? "Added traffic signals, improved visibility, and redesigned pedestrian crossings."
                    : selectedHotspot.name === "Riverside Drive Curve"
                      ? "Installed guardrails, added warning signs, and improved road surface for better traction."
                      : "Added speed bumps, flashing school zone signs, and dedicated crossing guards during peak hours."}
                </p>
                <p className="text-sm text-gray-500">
                  Completed:{" "}
                  {selectedHotspot.name === "Main Street Intersection"
                    ? "January 2023"
                    : selectedHotspot.name === "Riverside Drive Curve"
                      ? "March 2023"
                      : "May 2023"}
                </p>
              </div>
            )}

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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex">
              <div className="mr-3">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-1">About the Heatmap</h3>
                <p className="text-sm text-blue-700">
                  This heatmap shows accident-prone areas based on community reports and official data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
