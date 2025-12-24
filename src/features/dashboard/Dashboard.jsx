import { Navigate } from "react-router-dom";

function Dashboard() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-purple-600">
        🎉 Welcome toDashboard
      </h1>
    </div>
  );
}

export default Dashboard;
