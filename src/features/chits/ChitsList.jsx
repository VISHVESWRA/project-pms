import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiBarChart2 } from "react-icons/fi";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadCrumbs";
import { FilterMatchMode } from "primereact/api";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { deleteChit, fetchChits } from "./ChitSliece";

export default function ChitsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: chits } = useSelector((state) => state.chits);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedChits, setSelectedChits] = useState(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const [monthFilter, setMonthFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // ---------------- Fetch ----------------
  useEffect(() => {
    dispatch(fetchChits());
  }, [dispatch]);

  // ---------------- Search ----------------
  const handleSearch = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters((prev) => ({
      ...prev,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    }));
  };

  // ---------------- Month Filter ----------------
  useEffect(() => {
    if (monthFilter) {
      setFilters((prev) => ({
        ...prev,
        startDate: {
          value: monthFilter,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        startDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      }));
    }
  }, [monthFilter]);

  // ---------------- Status Filter ----------------
  useEffect(() => {
    if (statusFilter) {
      setFilters((prev) => ({
        ...prev,
        status: {
          value: statusFilter,
          matchMode: FilterMatchMode.EQUALS,
        },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
      }));
    }
  }, [statusFilter]);

  // ---------------- Breadcrumb ----------------
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Chits" }];

  const sideNavButtons = [
    {
      label: "Add",
      icon: <AddCircleOutlineRoundedIcon fontSize="small" />,
      onClick: () => navigate("/dashboard/chits/form"),
    },
  ];

  // ---------------- Paginator Buttons ----------------
  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" severity="secondary" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-download" severity="secondary" />
  );

  // ---------------- Actions ----------------
  const actionTemplate = (row) => (
    <div className="flex gap-3">
      <FiBarChart2
        className="text-green-600 cursor-pointer"
        title="Status"
        onClick={() => navigate(`../chits/status/${row._id}`)}
      />
      <FiEdit
        className="text-blue-500 cursor-pointer"
        title="Edit"
        onClick={() => navigate(`../chits/form/${row._id}`)}
      />
      <FiTrash2
        className="text-red-500 cursor-pointer"
        title="Delete"
        onClick={() => {
          if (window.confirm("Delete this chit?")) {
            dispatch(deleteChit(row._id));
          }
        }}
      />
    </div>
  );

  return (
    <>
      <BreadcrumbNav items={breadcrumbs} sideNavButtons={sideNavButtons} />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-3">
        <TextField
          label="Search Chits"
          size="small"
          type="search"
          value={globalFilterValue}
          onChange={handleSearch}
          sx={{ width: 280 }}
        />

        <TextField
          label="Filter by Month"
          size="small"
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        />

        <TextField
          label="Filter by Status"
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />

        <button
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
          onClick={() => {
            setGlobalFilterValue("");
            setMonthFilter("");
            setStatusFilter("");
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="card m-2">
        <DataTable
          value={chits}
          dataKey="_id"
          selection={selectedChits}
          onSelectionChange={(e) => setSelectedChits(e.value)}
          selectionMode="checkbox"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          scrollable
          scrollHeight="calc(100vh - 260px)"
          filters={filters}
          globalFilterFields={["chitName", "groupName", "status"]}
          showGridlines
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />

          <Column field="chitName" header="Chit Name" />
          <Column field="groupName" header="Group" />

          <Column
            header="Total Amount"
            body={(row) => `₹${row.totalAmount?.toLocaleString()}`}
          />

          <Column
            header="Monthly EMI"
            body={(row) => `₹${row.monthlyAmount?.toLocaleString()}`}
          />

          <Column
            header="Progress"
            body={(row) => `${row.paidMonths}/${row.duration}`}
          />

          <Column
            field="status"
            header="Status"
            body={(row) => (
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  row.status === "active"
                    ? "bg-orange-100 text-orange-700"
                    : row.status === "upcoming"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {row.status.toUpperCase()}
              </span>
            )}
          />

          <Column header="Actions" body={actionTemplate} />
        </DataTable>
      </div>
    </>
  );
}
