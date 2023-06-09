import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import {
  HomePage,
  LandingPage,
  Resetpass,
  Detail,
  Cart,
  Favorites,
  MyOrders,
  MyProfile,
  MyReviews,
  ContactUs,
  About,
  Register,
  Login,
  CreatePageReview,
} from "./Views/index";
import OurProducts from "./Views/OurProducts/OurProducts";
import { NavBar } from "./Components/index";
import Dashboard from "./Views/Dashboard/Dashboard";
import NotFound from "./Views/NotFound/NotFound";
import LoginAdmin from "./Views/LoginAdmin/LoginAdmin";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" state={{ showLogin: true }} />
  );
};

const ProtectedAdminRoute = ({ element: Component, ...rest }) => {
  const isAuthenticatedAdmin = localStorage.getItem("admin");

  return isAuthenticatedAdmin ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/loginAdmin" state={{ showLogin: true }} />
  );
};
function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname !== "/admin" && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/ResetPass" element={<Resetpass />} />
        <Route path="/About" element={<About />} />
        <Route path="/OurProducts" element={<OurProducts />} />
        <Route path="/PageReview" element={<CreatePageReview />} />
        <Route path={"*"} element={<NotFound />} />
        <Route
          path="/MyOrders"
          element={<ProtectedRoute element={MyOrders} />}
        />
        <Route
          path="/MyProfile"
          element={<ProtectedRoute element={MyProfile} />}
        />
        <Route
          path="/Favorites"
          element={<ProtectedRoute element={Favorites} />}
        />
        <Route
          path="/MyReviews"
          element={<ProtectedRoute element={MyReviews} />}
        />
        <Route
          path="/admin"
          element={<ProtectedAdminRoute element={Dashboard} />}
        />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        {/* <Route path="/admin" element={<Dashboard />} /> */}
      </Routes>
    </div>
  );
}
export default App;
