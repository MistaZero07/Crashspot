"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowDownUp,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Filter,
  MapPin,
  Search,
  ThumbsUp,
  Wrench,
} from "lucide-react"

export default function Records() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("recent")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample records data
  const records = [
    {
      id: 1,
      location: "Main Street & Oak Avenue Intersection",
      area: "Downtown",
      issue:
        "Poor visibility at night, inadequate traffic signals, and confusing lane markings leading to frequent collisions, especially during peak hours.",
      action:
        "Installed LED street lighting, added dedicated turn signals, repainted lane markings, and implemented a pedestrian-first crossing system with countdown timers.",
      before: 12,
      after: 3,
      reduction: 75,
      reportDate: "2022-08-15",
      completionDate: "2023-01-20",
      status: "completed",
      reportedBy: "Community members",
      priority: "high",
      cost: "$85,000",
      coordinates: "34.0522° N, 118.2437° W",
    },
    {
      id: 2,
      location: "Riverside Drive Curve",
      area: "Eastside",
      issue:
        "Sharp curve with inadequate warning signs and slippery road surface during rain, causing vehicles to lose control and veer off the road.",
      action:
        "Installed guardrails, added reflective warning signs, improved drainage, and applied high-friction surface treatment to increase traction.",
      before: 8,
      after: 1,
      reduction: 88,
      reportDate: "2022-09-03",
      completionDate: "2023-03-15",
      status: "completed",
      reportedBy: "Local residents",
      priority: "medium",
      cost: "$62,000",
      coordinates: "34.0548° N, 118.2642° W",
    },
    {
      id: 3,
      location: "Oak Street School Zone",
      area: "Northside",
      issue:
        "Speeding vehicles in school zone with inadequate crosswalks and poor visibility of pedestrians, particularly during school drop-off and pick-up times.",
      action:
        "Added speed bumps, installed flashing school zone signs with reduced speed limits during school hours, and stationed crossing guards at key intersections.",
      before: 5,
      after: 0,
      reduction: 100,
      reportDate: "2022-10-12",
      completionDate: "2023-05-05",
      status: "completed",
      reportedBy: "School administration",
      priority: "high",
      cost: "$45,000",
      coordinates: "34.0575° N, 118.2277° W",
    },
    {
      id: 4,
      location: "Highway 101 Entrance Ramp",
      area: "Westside",
      issue:
        "Short merge lane causing dangerous merging situations and frequent rear-end collisions during rush hour traffic.",
      action:
        "Extended the merge lane by 200 feet, added merge assistance signage, and installed warning lights to alert drivers of stopped traffic ahead.",
      before: 15,
      after: 4,
      reduction: 73,
      reportDate: "2022-07-22",
      completionDate: "2023-02-28",
      status: "completed",
      reportedBy: "Traffic department",
      priority: "high",
      cost: "$120,000",
      coordinates: "34.0195° N, 118.4912° W",
    },
    {
      id: 5,
      location: "Pine Street Bridge",
      area: "Central",
      issue:
        "Narrow lanes and poor lighting causing side-swipe accidents, particularly during nighttime and adverse weather conditions.",
      action:
        "Widened lanes by reducing shoulder width, installed LED lighting along the entire bridge, and added reflective lane dividers.",
      before: 7,
      after: 2,
      reduction: 71,
      reportDate: "2022-11-05",
      completionDate: "2023-04-10",
      status: "completed",
      reportedBy: "City engineers",
      priority: "medium",
      cost: "$95,000",
      coordinates: "34.0407° N, 118.2468° W",
    },
    {
      id: 6,
      location: "Maple Avenue & 5th Street",
      area: "Downtown",
      issue:
        "Unprotected left turns and pedestrian crossing conflicts leading to frequent accidents involving both vehicles and pedestrians.",
      action:
        "Implementation of protected left-turn signals, pedestrian scramble crossing, and curb extensions to improve visibility and reduce crossing distances.",
      before: 9,
      after: 2,
      reduction: 78,
      reportDate: "2022-08-30",
      completionDate: "2023-03-25",
      status: "completed",
      reportedBy: "Pedestrian advocacy group",
      priority: "high",
      cost: "$75,000",
      coordinates: "34.0465° N, 118.2551° W",
    },
    {
      id: 7,
      location: "Sunset Boulevard Corridor",
      area: "Westside",
      issue:
        "Multiple issues including speeding, inadequate lighting, and poor access management leading to a high number of accidents along a 1-mile stretch.",
      action:
        "In progress: Comprehensive corridor improvement including speed management, access control, lighting upgrades, and pedestrian facilities.",
      before: 22,
      after: null,
      reduction: null,
      reportDate: "2023-01-15",
      completionDate: null,
      status: "in-progress",
      reportedBy: "Community task force",
      priority: "high",
      cost: "$250,000 (estimated)",
      coordinates: "34.0522° N, 118.2437° W",
    },
    {
      id: 8,
      location: "Harbor View Roundabout",
      area: "Southside",
      issue:
        "Confusing lane markings and signage in multi-lane roundabout causing frequent sideswipe collisions and near-misses.",
      action:
        "In progress: Redesigning lane markings, improving signage, adding yield lines, and installing overhead directional signs.",
      before: 11,
      after: null,
      reduction: null,
      reportDate: "2023-02-10",
      completionDate: null,
      status: "in-progress",
      reportedBy: "Traffic safety committee",
      priority: "medium",
      cost: "$85,000 (estimated)",
      coordinates: "34.0336° N, 118.2378° W",
    },
  ]

  // Filter and sort records
  const filteredRecords = records
    .filter((record) => {
      // Filter by status
      if (statusFilter !== "all" && record.status !== statusFilter) return false

      // Filter by search query
      if (
        searchQuery &&
        !record.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !record.area.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false

      return true
    })
    .sort((a, b) => {
      // Sort by selected criteria
      switch (sortBy) {
        case "recent":
          return new Date(b.reportDate) - new Date(a.reportDate)
        case "highest-reduction":
          // Handle in-progress records (null reduction)
          if (a.reduction === null) return 1
          if (b.reduction === null) return -1
          return b.reduction - a.reduction
        case "location":
          return a.location.localeCompare(b.location)
        default:
          return 0
      }
    })

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "planned":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Get reduction color
  const getReductionColor = (reduction) => {
    if (reduction === null) return "text-gray-500"
    if (reduction >= 90) return "text-green-600"
    if (reduction >= 70) return "text-green-500"
    if (reduction >= 50) return "text-yellow-600"
    return "text-orange-500"
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Safety Improvement Records</h1>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Detailed records of hazards reported by community members and the improvements made by the city to reduce
            accidents.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md mb-8 p-4 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Search by location or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>

                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b">Status</div>
                      <button
                        className={`block px-4 py-2 text-sm w-full text-left ${statusFilter === "all" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-100"}`}
                        onClick={() => setStatusFilter("all")}
                      >
                        All
                      </button>
                      <button
                        className={`block px-4 py-2 text-sm w-full text-left ${statusFilter === "completed" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-100"}`}
                        onClick={() => setStatusFilter("completed")}
                      >
                        Completed
                      </button>
                      <button
                        className={`block px-4 py-2 text-sm w-full text-left ${statusFilter === "in-progress" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-100"}`}
                        onClick={() => setStatusFilter("in-progress")}
                      >
                        In Progress
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {}}
                >
                  <ArrowDownUp className="h-4 w-4 mr-2" />
                  Sort by
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>

                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 hidden">
                  <div className="py-1">
                    <button
                      className="block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100"
                      onClick={() => setSortBy("recent")}
                    >
                      Most Recent
                    </button>
                    <button
                      className="block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100"
                      onClick={() => setSortBy("highest-reduction")}
                    >
                      Highest Reduction
                    </button>
                    <button
                      className="block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100"
                      onClick={() => setSortBy("location")}
                    >
                      Location (A-Z)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <div className="text-sm text-gray-500 flex items-center mr-2">Active filters:</div>

            {statusFilter !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                <button className="ml-1 text-blue-500 hover:text-blue-700" onClick={() => setStatusFilter("all")}>
                  ×
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Search: {searchQuery}
                <button className="ml-1 text-purple-500 hover:text-purple-700" onClick={() => setSearchQuery("")}>
                  ×
                </button>
              </span>
            )}

            {sortBy !== "recent" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Sort: {sortBy === "highest-reduction" ? "Highest Reduction" : "Location (A-Z)"}
                <button className="ml-1 text-yellow-500 hover:text-yellow-700" onClick={() => setSortBy("recent")}>
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-6">
          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            filteredRecords.map((record) => (
              <div key={record.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 bg-gray-50 md:w-64 p-6 flex flex-col justify-between border-r border-gray-100">
                    <div>
                      <div className="flex items-center mb-4">
                        <MapPin className="h-5 w-5 text-red-500 mr-2" />
                        <h3 className="text-lg font-bold text-gray-900">{record.location}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{record.area}</p>

                      <div className="flex items-center mb-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}
                        >
                          {record.status === "completed" ? "Completed" : "In Progress"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      {record.status === "completed" ? (
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Before:</span>
                            <span className="text-sm font-bold text-gray-900">{record.before} accidents/year</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">After:</span>
                            <span className="text-sm font-bold text-green-600">{record.after} accidents/year</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${record.reduction}%` }}
                            ></div>
                          </div>
                          <div className="text-right">
                            <span className={`text-sm font-bold ${getReductionColor(record.reduction)}`}>
                              {record.reduction}% reduction
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-blue-500 mr-2" />
                            <span className="text-sm text-blue-700">Improvement in progress</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 md:flex-1">
                    <div className="mb-6">
                      <div className="flex items-start mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Issue Identified</h4>
                          <p className="text-sm text-gray-600">{record.issue}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-start mb-2">
                        <Wrench className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Action Taken</h4>
                          <p className="text-sm text-gray-600">{record.action}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-xs text-gray-500">Reported by: {record.reportedBy}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-xs text-gray-500">
                            Reported: {new Date(record.reportDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-xs text-gray-500">
                            {record.completionDate
                              ? `Completed: ${new Date(record.completionDate).toLocaleDateString()}`
                              : "Estimated completion: TBD"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredRecords.length}</span> of{" "}
            <span className="font-medium">{records.length}</span> records
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Previous
            </button>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
