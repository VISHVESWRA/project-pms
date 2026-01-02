import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadCrumbs";

import TextField from "@mui/material/TextField";
import { FilterMatchMode } from "primereact/api";
import { deleteExpense, fetchExpenses } from "./ExpenseSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ExpensesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: expenses } = useSelector((state) => state.expenses);

  const [selectedExpenses, setSelectedExpenses] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    category: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [monthFilter, setMonthFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  // Global search
  const handleSearch = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters((prev) => ({
      ...prev,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    }));
  };

  // Monthly filter
  useEffect(() => {
    if (monthFilter) {
      setFilters((prev) => ({
        ...prev,
        date: { value: monthFilter, matchMode: FilterMatchMode.STARTS_WITH },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      }));
    }
  }, [monthFilter]);

  // Category filter
  useEffect(() => {
    if (categoryFilter) {
      setFilters((prev) => ({
        ...prev,
        category: {
          value: categoryFilter,
          matchMode: FilterMatchMode.CONTAINS,
        },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        category: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }));
    }
  }, [categoryFilter]);

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  // Table templates
  const amountTemplate = (rowData) => (
    <span className="font-semibold text-gray-700">
      ₹ {rowData.amount.toLocaleString("en-IN")}
    </span>
  );
  const dateTemplate = (rowData) =>
    new Date(rowData.date).toLocaleDateString("en-IN");

  const actionTemplate = (rowData) => (
    <div className="flex gap-3">
      <FiEdit
        size={18}
        className="text-blue-500 cursor-pointer hover:text-blue-700"
        onClick={() => navigate(`../expenses/form/${rowData._id}`)}
      />
      <FiTrash2
        size={18}
        className="text-red-500 cursor-pointer hover:text-red-700"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this expense?")) {
            dispatch(deleteExpense(rowData._id));
          }
        }}
      />
    </div>
  );

  const breadcrumb = [{ label: "Home", href: "/" }, { label: "Expenses" }];

  const sideButton = [
    {
      label: "Add",
      icon: <AddCircleOutlineRoundedIcon fontSize="small" />,
      onClick: () => navigate("/dashboard/expenses/form"),
    },
  ];

  return (
    <>
      <BreadcrumbNav items={breadcrumb} sideNavButtons={sideButton} />

      <div className="flex flex-wrap gap-4 justify-between items-center mb-3">
        <TextField
          label="Search Expenses"
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
          label="Filter by Category"
          size="small"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />

        <button
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
          onClick={() => {
            setGlobalFilterValue("");
            setMonthFilter("");
            setCategoryFilter("");
          }}
        >
          Clear Filters
        </button>
      </div>

      <div className="overflow-x-auto">
        <DataTable
          value={expenses}
          dataKey="_id"
          selection={selectedExpenses}
          onSelectionChange={(e) => setSelectedExpenses(e.value)}
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
          globalFilterFields={[
            "expenseName",
            "category",
            "paymentMode",
            "type",
          ]}
          className="my-table"
          showGridlines
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
          <Column field="expenseName" header="Expense Name" />
          <Column field="category" header="Category" />
          <Column header="Amount" body={amountTemplate} />
          <Column field="paymentMode" header="Payment Mode" />
          <Column field="type" header="Type" />
          <Column header="Date" body={dateTemplate} />
          <Column header="Actions" body={actionTemplate} />
        </DataTable>
      </div>
    </>
  );
}
