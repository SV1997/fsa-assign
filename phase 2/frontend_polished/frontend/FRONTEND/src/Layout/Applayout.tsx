import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../Store/auth/authSlice"

export default function AppLayout() {
  // keeping your original selector style
  const { user } = useSelector((state: any) => state.auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const year = new Date().getFullYear()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Nav */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/placeholder-logo.png"
              alt="Portal logo"
              className="h-9 w-9 rounded-full border border-slate-200 object-cover"
            />
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Equipment Management System
              </h1>
              <p className="text-xs text-slate-500">College Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                <p className="text-[11px] uppercase tracking-wide text-slate-500">
                  {user?.role}
                </p>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer with logo */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <img
              src="/placeholder-logo.png" // you can add a separate footer logo if you want
              alt="Footer logo"
              className="h-6 w-6 rounded-full border border-slate-200 object-cover"
            />
            <span>Equipment Management System · College Portal</span>
          </div>
          <span>© {year} college</span>
        </div>
      </footer>
    </div>
  )
}
