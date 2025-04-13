import { MapPin, Shield, TrendingDown, Users } from "lucide-react"
// import AIImpactSummaryCard from '../components/AIImpactSummaryCard';

export default function Home() {
  const [aiSummary, setAiSummary] = useState(
    "📈 AI Insight: Reports from 2019–2022 indicate a rising trend of crashes in dimly lit intersections. Improvements like lighting and speed control could reduce incidents by 30% in affected zones."
  );
  const [showSummaryBtn, setShowSummaryBtn] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "images/road1.jpg",
    "images/road2.jpg",
    "images/road3.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">

      {/* 🔮 AI Summary Popup */}
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

      {/* 🔄 Show Summary Button */}
      {showSummaryBtn && !aiSummary && (
        <button
          onClick={() => {
            setAiSummary("📈 AI Insight: Reports from 2019–2022 indicate a rising trend of crashes in dimly lit intersections. Improvements like lighting and speed control could reduce incidents by 30% in affected zones.");
            setShowSummaryBtn(false);
          }}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 z-50"
        >
          Show AI Summary
        </button>
      )}

      {/* 🚦 Hero Section with background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Making Our Roads <span className="text-red-200">Safer Together</span>
              </h1>
              <p className="text-lg mb-8 text-red-50/90 leading-relaxed">
                Report accident-prone areas, track improvements, and help reduce accidents in our community.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/dashboard" className="px-6 py-3 bg-white text-red-700 font-medium rounded-lg hover:bg-red-100 transition">
                  View Dashboard
                </a>
                <a href="/report" className="px-6 py-3 bg-red-800 text-white font-medium rounded-lg hover:bg-red-900 transition">
                  Report a Crash
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-lg shadow-xl overflow-hidden border border-white/10 relative">
                <img
                  src={images[currentImage]}
                  alt="Road safety"
                  className="w-full h-[400px] object-cover transition-all duration-1000 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 Our Impact */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Through community reporting and city collaboration, we’re turning data into action and saving lives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white shadow rounded-lg p-6">
              <MapPin className="mx-auto mb-4 text-indigo-600" size={36} />
              <h3 className="text-3xl font-bold text-gray-900">327</h3>
              <p className="text-gray-600 mt-1">Accident Spots Identified</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <Shield className="mx-auto mb-4 text-green-600" size={36} />
              <h3 className="text-3xl font-bold text-gray-900">92</h3>
              <p className="text-gray-600 mt-1">Safety Improvements Expected</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <TrendingDown className="mx-auto mb-4 text-blue-600" size={36} />
              <h3 className="text-3xl font-bold text-gray-900">32%</h3>
              <p className="text-gray-600 mt-1">Average Crash Reduction</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <Users className="mx-auto mb-4 text-purple-600" size={36} />
              <h3 className="text-3xl font-bold text-gray-900">1,500+</h3>
              <p className="text-gray-600 mt-1">Community Contributors</p>
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
