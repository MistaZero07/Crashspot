import { MapPin, Shield, TrendingDown, Users } from "lucide-react"
// import AIImpactSummaryCard from '../components/AIImpactSummaryCard';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Making Our Roads Safer Together</h1>
              <p className="text-lg mb-8">
                Report accident-prone areas, track improvements, and help reduce accidents in our community.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  View Accident Map
                </a>
                <a
                  href="#"
                  className="px-6 py-3 bg-indigo-800 text-white font-medium rounded-md hover:bg-indigo-900 transition-colors"
                >
                  Report an Accident
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Road safety illustration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">248</h3>
              <p className="text-gray-600">Accident Spots Identified</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">92</h3>
              <p className="text-gray-600">Safety Improvements Made</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <TrendingDown className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">32%</h3>
              <p className="text-gray-600">Average Accident Reduction</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1,500+</h3>
              <p className="text-gray-600">Community Contributors</p>
            </div>
            {/* <AIImpactSummaryCard /> */}
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
  )
}