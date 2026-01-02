import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadCrumbs";
import { FilterMatchMode } from "primereact/api";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { deletePolicy, fetchPolicies } from "./PolicySlice";
import { Button } from "react-bootstrap";

export default function PoliciesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: policies } = useSelector((state) => state.policies);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedExpenses, setSelectedExpenses] = useState(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    policyType: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [monthFilter, setMonthFilter] = useState("");
  const [policyTypeFilter, setPolicyTypeFilter] = useState("");

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters((prev) => ({
      ...prev,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    }));
  };

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

  useEffect(() => {
    if (policyTypeFilter) {
      setFilters((prev) => ({
        ...prev,
        policyType: {
          value: policyTypeFilter,
          matchMode: FilterMatchMode.CONTAINS,
        },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        policyType: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }));
    }
  }, [policyTypeFilter]);

  const setBreadcrumb = [{ label: "Home", href: "/" }, { label: "Policies" }];
  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" severity="secondary" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-download" severity="secondary" />
  );

  const setSideNavButton = [
    {
      label: "Add",
      icon: <AddCircleOutlineRoundedIcon fontSize="small" />,
      onClick: () => navigate("/dashboard/policies/form"),
    },
  ];

  const actionTemplate = (row) => (
    <div className="flex gap-3">
      <FiEdit
        className="text-blue-500 cursor-pointer"
        onClick={() => navigate(`../policies/form/${row._id}`)}
      />
      <FiTrash2
        className="text-red-500 cursor-pointer"
        onClick={() => {
          if (window.confirm("Delete this policy?"))
            dispatch(deletePolicy(row._id));
        }}
      />
    </div>
  );

  return (
    <>
      <BreadcrumbNav items={setBreadcrumb} sideNavButtons={setSideNavButton} />

      <div className="flex flex-wrap gap-4 justify-between items-center mb-3">
        {/* Search */}
        <TextField
          label="Search Policies"
          size="small"
          type="search"
          value={globalFilterValue}
          onChange={handleSearch}
          sx={{ width: 280 }}
        />

        {/* Month */}
        <TextField
          label="Filter by Month"
          size="small"
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        />

        {/* Policy Type */}
        <TextField
          label="Filter by Policy Type"
          size="small"
          value={policyTypeFilter}
          onChange={(e) => setPolicyTypeFilter(e.target.value)}
        />

        {/* Clear */}
        <button
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
          onClick={() => {
            setGlobalFilterValue("");
            setMonthFilter("");
            setPolicyTypeFilter("");
          }}
        >
          Clear Filters
        </button>
      </div>

      <div className="card m-2">
        <DataTable
          value={policies}
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
          globalFilterFields={[
            "policyName",
            "policyType",
            "provider",
            "policyNumber",
            "frequency",
            "status",
          ]}
          showGridlines
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
          <Column field="policyName" header="Policy Name" />
          <Column field="policyType" header="Type" />
          <Column field="provider" header="Provider" />
          <Column field="policyNumber" header="Policy No" />
          <Column field="premiumAmount" header="Premium" />
          <Column field="frequency" header="Frequency" />
          <Column field="status" header="Status" />
          <Column header="Actions" body={actionTemplate} />
        </DataTable>
      </div>
    </>
  );
}
