import { Outlet, Navigate } from "react-router-dom";
import "../../styles/authLayout.css";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const { currentUser } = useSelector((state) => state.user);

  const userID = currentUser?.data?.user?._id;

  const isAuthenticated = !!userID;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="authLayoutContainer">
          <div className="authContent">
            <h1 className="authTitle">Welcome to Our App</h1>
            <p className="authDescription">Please log in or register to continue.</p>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
