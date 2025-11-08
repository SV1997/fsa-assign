import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { logout } from "../Store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
export default function AppLayout(){
      const {user} = useSelector((state:any) => state.auth.user);
      const navigate = useNavigate();
        const dispatch = useDispatch();
      const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
      }
      const path= useLocation().pathname;
    return <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex justify-start gap-2 w-full">
        <img className="w-10 h-10" src="./login-logo.png" alt="" />
              <h1 className="text-2xl font-bold text-foreground">Equipment Management Portal</h1>
            </div>
            <div className="flex items-center gap-4 w-full justify-end">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
              <div className="w-full flex justify-end">
<button
                onClick={handleLogout}
                className="px-4 py-2 bg-destructive text-destructive-foreground bg-black text-white rounded-2xl hover:bg-destructive/90 transition-colors text-sm font-medium cursor-pointer"
              >
                Logout
              </button>
              </div>
              
            </div>
          </div>
        </div>
      </nav>
      <div className={`${path === "/dashboard" ? "bg-[url(./dashboard.jpg)]" : "bg-[url(./default.jpg)]"} bg-cover bg-center bg-fixed min-h-[calc(100vh-64px)] p-8`}>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <Outlet/>

        </div>
      </div>
    </div>
}