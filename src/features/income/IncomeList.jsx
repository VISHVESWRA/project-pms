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
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

export default function IncomeList() {
  const navigate = useNavigate();

  const [selectedIncomes, setSelectedIncomes] = useState(null);

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setGlobalFilterValue(value);

    setFilters((prev) => ({
      ...prev,
      global: {
        value: value,
        matchMode: FilterMatchMode.CONTAINS,
      },
    }));
  };

  // ✅ DUMMY DATA
  const incomes = [
    {
      _id: "1",
      sourceName: "Salary",
      category: "Job",
      amount: 45000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Active",
      date: "2025-01-05",
    },
    {
      _id: "2",
      sourceName: "Freelancing",
      category: "Online",
      amount: 18000,
      frequency: "One Time",
      paymentMode: "UPI",
      type: "Active",
      date: "2025-01-12",
    },
    {
      _id: "3",
      sourceName: "House Rent",
      category: "Rental",
      amount: 12000,
      frequency: "Monthly",
      paymentMode: "Cash",
      type: "Passive",
      date: "2025-01-01",
    },
    {
      _id: "4",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "5",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
    {
      _id: "6",
      sourceName: "Mutual Fund",
      category: "Investment",
      amount: 6000,
      frequency: "Monthly",
      paymentMode: "Bank",
      type: "Passive",
      date: "2025-01-10",
    },
  ];

  const setBreadcrumb = [
    { label: "Home", href: "/" },
    { label: "Income List" },
  ];

  const setSideNavButton = [
    {
      label: "Add Income",
      icon: <AddCircleOutlineRoundedIcon fontSize="small" />,
      onClick: () => navigate("/dashboard/income/form"),
    },
  ];

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
        onClick={() => navigate(`/income/edit/${rowData._id}`)}
      />
      <FiTrash2
        size={18}
        className="text-red-500 cursor-pointer hover:text-red-700"
      />
    </div>
  );

  return (
    <div>
      <BreadcrumbNav items={setBreadcrumb} sideNavButtons={setSideNavButton} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3 items-center">
        <span className="p-input-icon-left">
          <TextField
            id="outlined-search"
            label="Search Income"
            type="search"
            size="small"
            value={globalFilterValue}
            onChange={handleSearchChange}
            sx={{ width: 280 }}
          />
        </span>

        {/* <Dropdown
          value={selectedMonth}
          options={monthOptions}
          onChange={onMonthChange}
          placeholder="Filter by Month"
          showClear
          className="p-inputtext-sm w-56"
        /> */}
      </div>

      <div className="card m-2">
        <div className="overflow-x-auto">
          <DataTable
            value={incomes}
            dataKey="_id"
            selectionMode="checkbox"
            selection={selectedIncomes}
            onSelectionChange={(e) => setSelectedIncomes(e.value)}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
            rowHover
            showGridlines
            /* 🔥 SCROLL SETTINGS */
            className="my-table"
            scrollable
            scrollHeight="420px"
            responsiveLayout="scroll"
            filters={filters}
            globalFilterFields={[
              "sourceName",
              "category",
              "frequency",
              "paymentMode",
              "type",
            ]}
          >
            <Column selectionMode="multiple" frozen />

            <Column field="sourceName" header="Income Source" />
            <Column field="category" header="Category" />
            <Column header="Amount" body={amountTemplate} />
            <Column field="frequency" header="Frequency" />
            <Column field="paymentMode" header="Payment Mode" />
            <Column field="type" header="Type" />
            <Column header="Date" body={dateTemplate} />

            <Column
              header="Actions"
              body={actionTemplate}
              frozen
              alignFrozen="right"
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
}
