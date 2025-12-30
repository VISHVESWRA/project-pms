import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadCrumbs";
import { FilterMatchMode } from "primereact/api";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { deletePolicy, fetchPolicies } from "./policySlice";

export default function PoliciesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: policies } = useSelector((state) => state.policies);

  const [selectedPolicies, setSelectedPolicies] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  const handleSearch = (e) => setGlobalFilter(e.target.value);

  const amountTemplate = (row) => (
    <span>₹ {row.premiumAmount.toLocaleString("en-IN")}</span>
  );

  const setBreadcrumb = [{ label: "Home", href: "/" }, { label: "Policies" }];

  const setSideNavButton = [
    {
      label: "Add",
      icon: <AddCircleOutlineRoundedIcon fontSize="small" />,
      onClick: () => navigate("/dashboard/policies/form"),
    },
  ];

  // const handleSearch = (e) => {
  //   const value = e.target.value;
  //   setGlobalFilterValue(value);
  //   setFilters({
  //     global: { value, matchMode: FilterMatchMode.CONTAINS },
  //   });
  // };

  // const amountTemplate = (row) => (
  //   <span className="font-semibold">₹ {row.premiumAmount}</span>
  // );

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

      <div className="flex justify-between items-center mb-3">
        <span className="p-input-icon-left">
          <TextField
            id="outlined-search"
            label="Search Income"
            type="search"
            size="small"
            value={globalFilter}
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
          globalFilterFields={[
            "policyName",
            "policyType",
            "provider",
            "policyNumber",
            "status",
            "frequency",
          ]}
          filters={{ global: { value: globalFilter, matchMode: "contains" } }}
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
