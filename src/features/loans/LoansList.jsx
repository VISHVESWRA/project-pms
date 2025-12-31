import { Chip, Divider, TextField, MenuItem } from "@mui/material";
import { Plus, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import BreadcrumbNav from "../../components/BreadCrumbs";
import { FilterMatchMode } from "primereact/api";
import { deleteLoan, fetchLoans } from "./LoanSlice";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function LoanList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: loans } = useSelector((state) => state.loans);

  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Loans" }];

  const sideButton = [
    {
      label: "Add",
      icon: <AddCircleOutlineRoundedIcon fontSize="small" />,
      onClick: () => navigate("/dashboard/loans/form"),
    },
  ];

  const actionTemplate = (rowData) => (
    <div className="flex gap-3">
      <FiEdit
        size={18}
        className="text-blue-500 cursor-pointer hover:text-blue-700"
        onClick={() => navigate(`../loan/form/${rowData._id}`)}
      />
      <FiTrash2
        size={18}
        className="text-red-500 cursor-pointer hover:text-red-700"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this expense?")) {
            dispatch(deleteLoan(rowData._id));
          }
        }}
      />
    </div>
  );

  // ------------------ STATE ------------------
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [month, setMonth] = useState("");
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const [selectedLoans, setSelectedLoans] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [monthFilter, setMonthFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      startDate: {
        value: monthFilter || null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
    }));
  }, [monthFilter]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      status: {
        value: statusFilter || null,
        matchMode: FilterMatchMode.CONTAINS,
      },
    }));
  }, [statusFilter]);

  const statusColor = (status) => (status === "active" ? "success" : "default");

  return (
    <>
      <BreadcrumbNav items={breadcrumbs} sideNavButtons={sideButton} />

      {/* <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border">
        Header
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

        Filters (NO LAYOUT CHANGE)
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

        Table
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

        Pagination
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
      </div> */}

      <div className="flex flex-wrap gap-4 justify-between items-center mb-3">
        <TextField
          label="Search Loans"
          size="small"
          value={globalFilterValue}
          onChange={(e) => {
            const v = e.target.value;
            setGlobalFilterValue(v);
            setFilters((p) => ({
              ...p,
              global: { value: v, matchMode: FilterMatchMode.CONTAINS },
            }));
          }}
        />

        <TextField
          type="month"
          size="small"
          label="Month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        />

        <TextField
          size="small"
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />

        <button
          className="px-3 py-1 border rounded"
          onClick={() => {
            setGlobalFilterValue("");
            setMonthFilter("");
            setStatusFilter("");
          }}
        >
          Clear
        </button>
      </div>

      <div className="overflow-x-auto">
        <DataTable
          value={loans || []}
          dataKey="_id"
          selection={selectedLoans}
          onSelectionChange={(e) => setSelectedLoans(e.value)}
          selectionMode="checkbox"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          scrollable
          scrollHeight="calc(100vh - 260px)"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          filters={filters}
          rowHover
          globalFilterFields={["loanName", "loanType", "lender", "status"]}
          className="my-table"
          showGridlines
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />

          <Column field="loanName" header="Loan" />
          <Column field="loanType" header="Type" />
          <Column field="loanAmount" header="Amount" />
          <Column field="emi" header="EMI" />
          <Column field="tenure" header="Tenure" />
          <Column field="status" header="Status" />
          <Column body={actionTemplate} header="Actions" />
        </DataTable>
      </div>
    </>
  );
}
