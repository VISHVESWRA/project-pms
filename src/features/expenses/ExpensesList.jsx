import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadCrumbs";

import TextField from "@mui/material/TextField";
import { FilterMatchMode } from "primereact/api";

export default function ExpensesList() {
  const navigate = useNavigate();
  const [selectedExpenses, setSelectedExpenses] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const expenses = [
    {
      _id: "1",
      expenseName: "Groceries",
      category: "Food",
      amount: 3500,
      paymentMode: "Cash",
      type: "Essential",
      date: "2025-01-10",
    },
    {
      _id: "2",
      expenseName: "Electricity Bill",
      category: "Utilities",
      amount: 2200,
      paymentMode: "UPI",
      type: "Essential",
      date: "2025-01-05",
    },
    {
      _id: "3",
      expenseName: "Internet",
      category: "Utilities",
      amount: 999,
      paymentMode: "Bank",
      type: "Recurring",
      date: "2025-01-02",
    },
    {
      _id: "4",
      expenseName: "Movie",
      category: "Entertainment",
      amount: 500,
      paymentMode: "Cash",
      type: "Non-Essential",
      date: "2025-01-12",
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters({
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    });
  };

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
        onClick={() => navigate(`/expenses/edit/${rowData._id}`)}
      />
      <FiTrash2
        size={18}
        className="text-red-500 cursor-pointer hover:text-red-700"
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

      <div className="flex justify-between items-center mb-3">
        <span className="p-input-icon-left">
          <TextField
            id="outlined-search"
            label="Search Income"
            type="search"
            size="small"
            value={globalFilterValue}
            onChange={handleSearch}
            sx={{ width: 280 }}
          />
        </span>
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
          scrollable
          scrollHeight="calc(100vh - 260px)"
          responsiveLayout="scroll"
          filters={filters}
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
          <Column field="expenseName" header="Expenses" />
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
