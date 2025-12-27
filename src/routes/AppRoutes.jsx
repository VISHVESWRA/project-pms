import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login.jsx";
// import Dashboard from "../features/dashboard/Dashboard.jsx";
import Register from "../features/auth/Register.jsx";
import ForgotPassword from "../features/auth/ForgotPassword.jsx";
import ResetPassword from "../features/auth/ResetPassword.jsx";
import Loans from "../features/sidebar/list/loans/Loans.jsx";
import Policies from "../features/sidebar/list/Policies.jsx";
import Chit from "../features/sidebar/list/chit/Chit.jsx";
import Home from "../features/sidebar/list/Home.jsx";
import AuthLayout from "../layouts/AuthLayouts.jsx";
import DashboardLayout from "../layouts/DashboardLayouts.jsx";
import ChitAct from "../features/sidebar/list/chit/ChitAct.jsx";
import ChitServices from "../features/sidebar/list/chit/ChitServices.jsx";
import PersonalLoan from "../features/sidebar/list/loans/PersonalLoan.jsx";
import IncomeForm from "../features/income/IncomeForm.jsx";
import IncomeList from "../features/income/IncomeList.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* DASHBOARD ROUTES */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="loans" element={<Loans />} />
        <Route path="policies" element={<Policies />} />
        <Route path="chit" element={<Chit />} />
        <Route path="chit-act" element={<ChitAct />} />
        <Route path="chit-services" element={<ChitServices />} />
        <Route path="personal-loan" element={<PersonalLoan />} />
        <Route path="income/form" element={<IncomeForm />} />
        <Route path="income/form/edit/:id" element={<IncomeForm />} />
        <Route path="income/list" element={<IncomeList />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
