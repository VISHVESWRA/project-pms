import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Button, Chip, Divider, TextField, MenuItem } from "@mui/material";
import { Plus, Pencil } from "lucide-react";
import BreadcrumbNav from "../../components/BreadCrumbs";

export default function ChitList() {
  const navigate = useNavigate();

  // ---------------- Breadcrumb ----------------
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Chits" }];

  // ---------------- Filters ----------------
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // ---------------- Dummy Data ----------------
  const chits = [
    {
      id: 1,
      name: "Gold Chit",
      amount: 100000,
      monthly: 5000,
      members: 20,
      tenure: 20,
      status: "active",
      startDate: "2025-01-10",
    },
    {
      id: 2,
      name: "Savings Chit",
      amount: 200000,
      monthly: 10000,
      members: 20,
      tenure: 20,
      status: "closed",
      startDate: "2025-03-05",
    },
  ];

  const monthOptions = [
    { label: "January", value: 0 },
    { label: "February", value: 1 },
    { label: "March", value: 2 },
    { label: "April", value: 3 },
    { label: "May", value: 4 },
    { label: "June", value: 5 },
    { label: "July", value: 6 },
    { label: "August", value: 7 },
    { label: "September", value: 8 },
    { label: "October", value: 9 },
    { label: "November", value: 10 },
    { label: "December", value: 11 },
  ];

  const filteredChits = chits.filter((chit) => {
    if (selectedMonth === "") return true;

    const month = new Date(chit.startDate).getMonth();
    return month === selectedMonth;
  });

  // ---------------- Handlers ----------------
  const onSearchChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters((prev) => ({
      ...prev,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    }));
  };

  const onStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    setFilters((prev) => ({
      ...prev,
      status: { value, matchMode: FilterMatchMode.EQUALS },
    }));
  };

  // ---------------- Templates ----------------
  const statusTemplate = (row) => (
    <Chip
      label={row.status === "active" ? "Active" : "Closed"}
      color={row.status === "active" ? "success" : "default"}
      size="small"
    />
  );

  const actionTemplate = (row) => (
    <Button
      size="small"
      startIcon={<Pencil size={14} />}
      onClick={() => navigate(`../chit/edit/${row.id}`)}
    >
      Edit
    </Button>
  );

  return (
    <>
      <BreadcrumbNav items={breadcrumbs} />

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Chits</h2>
            <p className="text-sm text-gray-500">
              Track and manage your chit funds
            </p>
          </div>

          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            onClick={() => navigate("../chits/form")}
          >
            Add Chit
          </Button>
        </div>

        <Divider />

        {/* Filters (Loans style) */}
        <div className="px-6 py-4 flex flex-wrap gap-4">
          <TextField
            label="Search"
            size="small"
            value={globalFilterValue}
            onChange={onSearchChange}
            sx={{ width: 260 }}
          />

          <TextField
            select
            label="Status"
            size="small"
            value={statusFilter}
            onChange={onStatusChange}
            sx={{ width: 180 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </TextField>

          <TextField
            select
            label="Month"
            size="small"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            sx={{ width: 180 }}
          >
            <MenuItem value="">All</MenuItem>
            {monthOptions.map((m) => (
              <MenuItem key={m.value} value={m.value}>
                {m.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <DataTable
            value={filteredChits}
            dataKey="id"
            filters={filters}
            globalFilterFields={["name"]}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            showGridlines
            className="p-datatable-sm"
            responsiveLayout="scroll"
          >
            <Column field="name" header="Chit Name" />
            <Column
              field="amount"
              header="Total Amount"
              body={(row) => `₹${row.amount.toLocaleString("en-IN")}`}
            />
            <Column
              field="monthly"
              header="Monthly"
              body={(row) => `₹${row.monthly.toLocaleString("en-IN")}`}
            />
            <Column field="members" header="Members" />
            <Column field="tenure" header="Tenure (Months)" />
            <Column field="status" header="Status" body={statusTemplate} />
            <Column header="Actions" body={actionTemplate} />
          </DataTable>
        </div>
      </div>
    </>
  );
}
