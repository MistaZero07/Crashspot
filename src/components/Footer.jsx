export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">SafeRoads</h3>
              <p className="text-gray-300 text-sm">
                Making our city roads safer through community reporting and data-driven improvements.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Statistics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Report an Accident
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-300">
                Email: info@saferoads.org
                <br />
                Phone: (123) 456-7890
                <br />
                Address: 123 Safety Street, City
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} SafeRoads. All rights reserved.
          </div>
        </div>
      </footer>
    )
  }
  