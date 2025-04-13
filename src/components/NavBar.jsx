import { useEffect, useState, useRef } from "react"
import { Menu, X, MapPin, User } from "lucide-react"
import { auth } from "../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user)
      setAuthChecked(true)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setShowProfileMenu(false)
    navigate("/")
  }

  const handleDashboard = () => {
    setShowProfileMenu(false)
    navigate("/dashboard")
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-rose-600" />
            <span className="ml-2 text-xl font-bold">SafeRoads</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</a>
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</a>
            <a href="/heatmap" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">HeatMap</a>
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Statistics</a>
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</a>

            {authChecked && isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-md hover:bg-rose-700"
                >
                  <User className="h-5 w-5" />
                  Profile
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-50">
                    <button
                      onClick={handleDashboard}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              authChecked && (
                <button
                  onClick={() => navigate("/login")}
                  className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
                >
                  Login
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-rose-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && authChecked && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white z-40 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">About</a>
            <a href="/heatmap" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">HeatMap</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Statistics</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Contact</a>

            {isLoggedIn ? (
              <>
                <button onClick={handleDashboard} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">Dashboard</button>
                <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">Logout</button>
              </>
            ) : (
              <button onClick={() => navigate("/login")} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">Login</button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
