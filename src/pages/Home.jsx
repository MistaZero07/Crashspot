"use client"

import { useEffect, useState } from "react"
import { MapPin, Shield, TrendingDown, Users } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home({ onNavigate }) {
  const [aiSummary, setAiSummary] = useState(null)
  const [showSummaryBtn, setShowSummaryBtn] = useState(true)
  const images = ["/images/road1.jpg", "/images/road2.jpg", "/images/road3.jpg"]
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full">
      {/* AI Summary Popup */}
      {aiSummary && (
        <div className="fixed bottom-6 right-6 max-w-md bg-white border border-gray-200 shadow-2xl rounded-lg p-5 z-50 animate-fadeIn">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-semibold text-red-700">💡 AI Summary Insight</h3>
            <button
              onClick={() => {
                setAiSummary(null)
                setShowSummaryBtn(true)
              }}
              className="text-gray-400 hover:text-gray-600 text-lg font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-700 leading-snug">{aiSummary}</p>
        </div>
      )}

      {/* Show Summary Button */}
      {showSummaryBtn && !aiSummary && (
        <button
          onClick={() => {
            setAiSummary(
              "📈 AI Insight: Reports from 2019–2022 indicate a rising trend of crashes in dimly lit intersections. Improvements like lighting and speed control could reduce incidents by 30% in affected zones.",
            )
            setShowSummaryBtn(false)
          }}
          className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 z-50"
        >
          Show AI Summary
        </button>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6 border border-white/20">
                Community-Driven Road Safety
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Making Our Roads <span className="text-red-200">Safer Together</span>
              </h1>
              <p className="text-lg mb-8 text-red-50/90 leading-relaxed">
                Report accident-prone areas, track improvements, and help reduce accidents in our community. Join
                thousands of citizens making a difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate && onNavigate("heatmap")}
                  className="px-6 py-3 bg-white text-red-700 font-medium rounded-lg hover:bg-red-50 transition-colors shadow-lg shadow-red-900/30"
                >
                  View Accident Map
                </button>
                <button className="px-6 py-3 bg-red-900/80 text-white font-medium rounded-lg hover:bg-red-900 transition-colors border border-red-700/50 backdrop-blur-sm shadow-lg shadow-red-900/30">
                  Report an Accident
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-200/20 rounded-lg backdrop-blur-sm"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-300/20 rounded-lg backdrop-blur-sm"></div>
                <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-2xl relative z-10 border border-white/10">
                  <img
                    src={images[currentImage] || "/placeholder.svg"}
                    alt="Road safety"
                    className="w-full h-full object-cover transition-all duration-1000 ease-in-out transform scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full ${
                        currentImage === index ? "bg-white" : "bg-white/40"
                      } transition-all duration-300`}
                      aria-label={`Go to slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Through community reporting and data-driven improvements, we're making a measurable difference in road
              safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6">
                <MapPin className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">248</h3>
              <p className="text-gray-600">Accident Spots Identified</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">92</h3>
              <p className="text-gray-600">Safety Improvements Made</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
                <TrendingDown className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">32%</h3>
              <p className="text-gray-600">Average Accident Reduction</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-transform hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-full mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">1,500+</h3>
              <p className="text-gray-600">Community Contributors</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform connects community reporting with city action to create safer roads for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="absolute -top-5 -left-5 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg">
                1
              </div>
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Report</h3>
                <p className="text-gray-600 leading-relaxed">
                  Community members report accident-prone areas and hazards by clicking on our interactive map.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <a href="#" className="text-red-600 font-medium hover:text-red-700">
                    Learn more →
                  </a>
                </div>
              </div>
            </div>

            <div className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="absolute -top-5 -left-5 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg">
                2
              </div>
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Analyze</h3>
                <p className="text-gray-600 leading-relaxed">
                  We analyze the data to identify patterns and prioritize the most dangerous areas for improvement.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                    Learn more →
                  </a>
                </div>
              </div>
            </div>

            <div className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="absolute -top-5 -left-5 w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg">
                3
              </div>
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Improve</h3>
                <p className="text-gray-600 leading-relaxed">
                  City officials implement safety improvements based on our data and track the reduction in accidents.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <a href="#" className="text-green-600 font-medium hover:text-green-700">
                    Learn more →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Improvements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Improvements</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              See how our community-driven approach has led to real improvements in road safety.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Improvement Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transform transition-transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Main Street Intersection"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                  Intersection
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-900">Main Street Intersection</h3>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 text-sm font-medium">Before: 12 accidents/year</span>
                  <span className="text-green-600 text-sm font-medium">After: 3 accidents/year</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Added traffic signals, improved visibility, and redesigned pedestrian crossings.
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Completed: January 2023</p>
                  <span className="text-sm font-medium text-green-600">75% reduction</span>
                </div>
              </div>
            </div>

            {/* Improvement Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transform transition-transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Riverside Drive Curve"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                  Curve
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-900">Riverside Drive Curve</h3>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 text-sm font-medium">Before: 8 accidents/year</span>
                  <span className="text-green-600 text-sm font-medium">After: 1 accident/year</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "88%" }}></div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Installed guardrails, added warning signs, and improved road surface for better traction.
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Completed: March 2023</p>
                  <span className="text-sm font-medium text-blue-600">88% reduction</span>
                </div>
              </div>
            </div>

            {/* Improvement Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transform transition-transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Oak Street School Zone"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 left-4 bg-yellow-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                  School Zone
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-900">Oak Street School Zone</h3>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 text-sm font-medium">Before: 5 accidents/year</span>
                  <span className="text-green-600 text-sm font-medium">After: 0 accidents/year</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Added speed bumps, flashing school zone signs, and dedicated crossing guards during peak hours.
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Completed: May 2023</p>
                  <span className="text-sm font-medium text-yellow-600">100% reduction</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
          <Link
  to="/records"
  className="inline-flex items-center px-8 py-4 border border-gray-300 shadow-lg text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all"
>
  View All Improvements
</Link>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-8 border border-white/20">
              <MapPin className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Help Make Our Roads Safer</h2>
            <p className="text-xl mb-10 text-red-50/90 leading-relaxed">
              Join our community effort to identify and fix dangerous road conditions. Your report could save lives.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => onNavigate && onNavigate("heatmap")}
                className="px-8 py-4 bg-white text-red-700 font-medium rounded-lg hover:bg-red-50 transition-colors shadow-lg shadow-red-900/30"
              >
                View the Heatmap
              </button>
              <button className="px-8 py-4 bg-red-900/80 text-white font-medium rounded-lg hover:bg-red-900 transition-colors border border-red-700/50 backdrop-blur-sm shadow-lg shadow-red-900/30">
                Report an Accident
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
