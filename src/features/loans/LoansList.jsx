import { Button, Chip, Divider, TextField, MenuItem } from "@mui/material";
import { Plus, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import BreadcrumbNav from "../../components/BreadCrumbs";

export default function LoanList() {
  const navigate = useNavigate();

  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Loans" }];

  // ------------------ STATE ------------------
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [month, setMonth] = useState("");
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  // ------------------ DUMMY DATA ------------------
  const loans = [
    {
      id: 1,
      name: "Home Loan",
      type: "Home",
      amount: 2500000,
      emi: 24500,
      tenure: 240,
      status: "active",
      startDate: "2024-03-10",
    },
    {
      id: 2,
      name: "Personal Loan",
      type: "Personal",
      amount: 300000,
      emi: 9800,
      tenure: 36,
      status: "closed",
      startDate: "2024-01-15",
    },
  ];

  const statusColor = (status) => (status === "active" ? "success" : "default");

  // ------------------ FILTER LOGIC ------------------
  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      const matchSearch =
        loan.name.toLowerCase().includes(search.toLowerCase()) ||
        loan.type.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status ? loan.status === status : true;

      const matchMonth = month
        ? new Date(loan.startDate).getMonth() + 1 === Number(month)
        : true;

      return matchSearch && matchStatus && matchMonth;
    });
  }, [search, status, month]);

  // ------------------ PAGINATION ------------------
  const totalPages = Math.ceil(filteredLoans.length / rowsPerPage);
  const paginatedLoans = filteredLoans.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <BreadcrumbNav items={breadcrumbs} />

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Loans</h2>
            <p className="text-sm text-gray-500">
              Track and manage your loans & EMIs
            </p>
          </div>

          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            onClick={() => navigate("../loans/form")}
          >
            Add Loan
          </Button>
        </div>

        <Divider />

        {/* Filters (NO LAYOUT CHANGE) */}
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <TextField
            label="Search"
            size="small"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            select
            label="Status"
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </TextField>

          <TextField
            select
            label="Month"
            size="small"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <Divider />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Loan</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-right">EMI</th>
                <th className="px-4 py-3 text-center">Tenure</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedLoans.map((loan) => (
                <tr
                  key={loan.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`../loans/view/${loan.id}`)}
                >
                  <td className="px-4 py-3 font-medium">{loan.name}</td>
                  <td className="px-4 py-3">{loan.type}</td>
                  <td className="px-4 py-3 text-right">
                    ₹{loan.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    ₹{loan.emi.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">{loan.tenure} m</td>
                  <td className="px-4 py-3 text-center">
                    <Chip
                      label={loan.status === "active" ? "Active" : "Closed"}
                      size="small"
                      color={statusColor(loan.status)}
                    />
                  </td>
                  <td
                    className="px-4 py-3 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      size="small"
                      startIcon={<Pencil size={14} />}
                      onClick={() => navigate(`../loans/edit/${loan.id}`)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}

              {paginatedLoans.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No loans found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end gap-2 px-6 py-4">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                size="small"
                variant={page === i + 1 ? "contained" : "outlined"}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
