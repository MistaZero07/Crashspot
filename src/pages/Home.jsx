import { MapPin, Shield, TrendingDown, Users } from "lucide-react"
// import AIImpactSummaryCard from '../components/AIImpactSummaryCard';

export default function Home() {
  return (
    <div className="w-full">
      {/* AI Summary Popup */}
      {aiSummary && (
        <div className="fixed bottom-6 right-6 max-w-md bg-white border border-gray-200 shadow-2xl rounded-lg p-5 z-50 animate-fadeIn">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-semibold text-indigo-700">💡 AI Summary Insight</h3>
            <button
              onClick={() => {
                setAiSummary(null);
                setShowSummaryBtn(true);
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
              "📈 AI Insight: Reports from 2019–2022 indicate a rising trend of crashes in dimly lit intersections. Improvements like lighting and speed control could reduce incidents by 30% in affected zones."
            );
            setShowSummaryBtn(false);
          }}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 z-50"
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
      <section className="py-16 bg-gray-50">
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Our platform connects community reporting with city action to create safer roads for everyone.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Report</h3>
              <p className="text-gray-600">
                Community members report accident-prone areas and hazards by clicking on our interactive map.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Analyze</h3>
              <p className="text-gray-600">
                We analyze the data to identify patterns and prioritize the most dangerous areas for improvement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Improve</h3>
              <p className="text-gray-600">
                City officials implement safety improvements based on our data and track the reduction in accidents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Improvements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Improvements</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Improvement Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Main Street Intersection"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Main Street Intersection</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Before: 12 accidents/year</span>
                  <span className="text-green-600 text-sm">After: 3 accidents/year</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-gray-700 mb-4">
                  Added traffic signals, improved visibility, and redesigned pedestrian crossings.
                </p>
                <p className="text-sm text-gray-500">Completed: January 2023</p>
              </div>
            </div>

            {/* Improvement Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Riverside Drive Curve"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Riverside Drive Curve</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Before: 8 accidents/year</span>
                  <span className="text-green-600 text-sm">After: 1 accident/year</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "88%" }}></div>
                </div>
                <p className="text-gray-700 mb-4">
                  Installed guardrails, added warning signs, and improved road surface for better traction.
                </p>
                <p className="text-sm text-gray-500">Completed: March 2023</p>
              </div>
            </div>

            {/* Improvement Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Oak Street School Zone"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Oak Street School Zone</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Before: 5 accidents/year</span>
                  <span className="text-green-600 text-sm">After: 0 accidents/year</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                </div>
                <p className="text-gray-700 mb-4">
                  Added speed bumps, flashing school zone signs, and dedicated crossing guards during peak hours.
                </p>
                <p className="text-sm text-gray-500">Completed: May 2023</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View All Improvements
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Help Make Our Roads Safer</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community effort to identify and fix dangerous road conditions. Your report could save lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              View the Heatmap
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-indigo-800 text-white font-medium rounded-md hover:bg-indigo-900 transition-colors"
            >
              Report an Accident
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
