import { useForm } from "react-hook-form";
import { TextField, Button, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbNav from "../../components/BreadCrumbs";
import { createChit, updateChit } from "./ChitSliece";

export default function ChitForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chit = useSelector((state) =>
    state.chits.list.find((c) => c._id === id)
  );

  useEffect(() => {
    if (isEdit && chit) {
      reset({
        ...chit,
        startDate: chit.startDate?.split("T")[0],
      });
    }
  }, [isEdit, chit, reset]);

  const onSubmit = (data) => {
    console.log(data);

    const payload = {
      ...data,
      totalAmount: Number(data.totalAmount),
      monthlyAmount: Number(data.monthlyAmount),
      duration: Number(data.duration),
    };

    dispatch(createChit(payload));
    navigate("../chits/list");
  };

  return (
    <>
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Chits", href: "/dashboard/chits/list" },
          { label: isEdit ? "Edit Chit" : "Add Chit" },
        ]}
      />

      <div className="max-w-4xl mx-auto bg-white border rounded-lg">
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Chit" : "Add Chit"}
          </h2>
        </div>

        <Divider />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 grid md:grid-cols-12 gap-5"
        >
          {/* Chit Name */}
          <TextField
            label="Chit Name"
            size="small"
            className="md:col-span-6"
            {...register("chitName", { required: true })}
          />

          {/* Group Name */}
          <TextField
            label="Group Name"
            size="small"
            className="md:col-span-6"
            {...register("groupName")}
          />

          {/* Total Amount */}
          <TextField
            label="Total Amount"
            type="number"
            size="small"
            className="md:col-span-4"
            {...register("totalAmount", {
              required: true,
              valueAsNumber: true,
            })}
          />

          {/* Monthly Amount */}
          <TextField
            label="Monthly Amount"
            type="number"
            size="small"
            className="md:col-span-4"
            {...register("monthlyAmount", {
              required: true,
              valueAsNumber: true,
            })}
          />

          {/* Duration */}
          <TextField
            label="Duration (Months)"
            type="number"
            size="small"
            className="md:col-span-4"
            {...register("duration", { required: true, valueAsNumber: true })}
          />

          {/* Start Date */}
          <TextField
            label="Start Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            className="md:col-span-6"
            {...register("startDate", { required: true })}
          />

          {/* Actions */}
          <div className="md:col-span-12 flex justify-end gap-3">
            <Button onClick={() => navigate("../chits/list")}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save Chit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
