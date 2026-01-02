import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import ForgotPassword from "../features/auth/pages/ForgotPassword.jsx";
import ResetPassword from "../features/auth/pages/ResetPassword.jsx";
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
import ExpensesList from "../features/expenses/ExpensesList.jsx";
import ExpensesForm from "../features/expenses/ExpensesForm.jsx";
import PoliciesList from "../features/policies/PoliciesList.jsx";
import PolicyForm from "../features/policies/PoliciesForm.jsx";
import LoanForm from "../features/loans/LoansForm.jsx";
import LoanList from "../features/loans/LoansList.jsx";
import ChitList from "../features/chits/ChitsList.jsx";
import ChitForm from "../features/chits/ChitsForm.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* DASHBOARD ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route index element={<Home />} />
        {/* <Route index element={<Navigate to="home" replace />} /> */}
        <Route path="home" element={<Home />} />
        <Route path="loans" element={<Loans />} />
        <Route path="policies" element={<Policies />} />
        <Route path="chit" element={<Chit />} />
        <Route path="chit-act" element={<ChitAct />} />
        <Route path="chit-services" element={<ChitServices />} />
        <Route path="personal-loan" element={<PersonalLoan />} />

        <Route path="income/form" element={<IncomeForm />} />
        <Route path="income/form/:id" element={<IncomeForm />} />
        <Route path="income/list" element={<IncomeList />} />

        <Route path="expenses/form" element={<ExpensesForm />} />
        <Route path="expenses/form/:id" element={<ExpensesForm />} />
        <Route path="expenses/list" element={<ExpensesList />} />

        <Route path="policies/form" element={<PolicyForm />} />
        <Route path="policies/form/:id" element={<PolicyForm />} />
        <Route path="policies/list" element={<PoliciesList />} />

        <Route path="loans/form" element={<LoanForm />} />
        <Route path="loans/form/:id" element={<LoanForm />} />
        <Route path="loans/list" element={<LoanList />} />

        <Route path="chits/form" element={<ChitForm />} />
        <Route path="chits/form/:id" element={<ChitForm />} />
        <Route path="chits/list" element={<ChitList />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
