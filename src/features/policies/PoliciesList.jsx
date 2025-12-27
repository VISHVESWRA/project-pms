import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadCrumbs";
import { FilterMatchMode } from "primereact/api";
import TextField from "@mui/material/TextField";

export default function PoliciesList() {
  const navigate = useNavigate();
  const [selectedPolicies, setSelectedPolicies] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const policies = [
    {
      _id: "1",
      policyName: "Life Insurance",
      policyType: "Life",
      provider: "LIC",
      policyNumber: "LIC123456",
      premiumAmount: 12000,
      frequency: "Yearly",
      status: "Active",
      endDate: "2035-12-31",
    },
    {
      _id: "2",
      policyName: "Health Cover",
      policyType: "Health",
      provider: "Star Health",
      policyNumber: "SH998877",
      premiumAmount: 8500,
      frequency: "Yearly",
      status: "Active",
      endDate: "2026-06-30",
    },
  ];

  const setBreadcrumb = [{ label: "Home", href: "/" }, { label: "Policies" }];

  const setSideNavButton = [
    {
      label: "Add",
      icon: <AddCircleOutlineRoundedIcon fontSize="small" />,
      onClick: () => navigate("/dashboard/policies/form"),
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters({
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    });
  };

  const amountTemplate = (row) => (
    <span className="font-semibold">₹ {row.premiumAmount}</span>
  );

  const actionTemplate = (row) => (
    <div className="flex gap-3">
      <FiEdit
        className="text-blue-500 cursor-pointer"
        onClick={() => navigate(`/dashboard/policies/edit/${row._id}`)}
      />
      <FiTrash2 className="text-red-500 cursor-pointer" />
    </div>
  );

  return (
    <>
      <BreadcrumbNav items={setBreadcrumb} sideNavButtons={setSideNavButton} />

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

      <div className="card m-2">
        <DataTable
          value={policies}
          dataKey="_id"
          selection={selectedPolicies}
          onSelectionChange={(e) => setSelectedPolicies(e.value)}
          selectionMode="checkbox"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          showGridlines
          rowHover
          scrollable
          scrollHeight="400px"
          filters={filters}
          globalFilterFields={[
            "expenseName",
            "category",
            "paymentMode",
            "type",
          ]}
          className="my-table"
        >
          <Column selectionMode="multiple" style={{ width: "3rem" }} />
          <Column field="policyName" header="Policy Name" />
          <Column field="policyType" header="Type" />
          <Column field="provider" header="Provider" />
          <Column field="policyNumber" header="Policy No" />
          <Column body={amountTemplate} header="Premium" />
          <Column field="frequency" header="Frequency" />
          <Column field="status" header="Status" />
          <Column body={actionTemplate} header="Actions" />
        </DataTable>
      </div>
    </>
  );
}
