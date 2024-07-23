import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Box,
  Modal,
  IconButton,
  Avatar,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { getWorkers, addWorker, updateWorker, deleteWorker } from "./api";
import axios from "axios";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const calculateHours = (start, end) => {
  return end.substring(0, 2) - start.substring(0, 2);
};

const WorkerScreen = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    password: "",
    userNickName: "",
    userAddress: "",
    userPhoneNumber: "",
    workerSalary: 0,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [sortModel, setSortModel] = useState([{ field: "id", sort: "asc" }]);
  const [pageSize, setPageSize] = useState(5);

  const fetchData = async () => {
    try {
      const response = await getWorkers();
      const calculatedRows = response.map((row) => ({
        ...row,
        hours: calculateHours(row.worktimeStart, row.worktimeEnd),
        id: row.workerPk,
      }));
      setRows(calculatedRows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({
      id: "",
      username: "",
      password: "",
      userNickName: "",
      userAddress: "",
      userPhoneNumber: "",
      workerSalary: 0,
    });
    setImagePreview("");
    setImageFile(null);
    setOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const uploadImage = async (file) => {
    try {
      const response = await axios.post(
        "http://dstj-env.eba-bienmeha.ap-northeast-2.elasticbeanstalk.com/upload",
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.imgurl2; // 서버에서 반환된 URL
    } catch (error) {
      console.error("Error uploading file:", error.response.data);
      throw error;
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      let imageUrl = formData.imageUrl;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const data = { ...formData, imageUrl };
      const { id, ...dataWithoutId } = formData;
      const add_data = {
        username: dataWithoutId.username,
        password: dataWithoutId.password,
        userNickname: dataWithoutId.userNickName,
        userAddress: dataWithoutId.userAddress,
        userPhoneNumber: dataWithoutId.userPhoneNumber,
        workerSalary: Number(dataWithoutId.workerSalary),
      };

      if (formData.id) {
        const updateData = {
          workerPK: formData.id,
          userNickname: formData.userNickName,
          workerSalary: Number(formData.workerSalary),
        };
        await updateWorker(updateData);
      } else {
        await addWorker(
          add_data.username,
          add_data.password,
          add_data.userNickname,
          add_data.userPhoneNumber,
          add_data.workerSalary
        );
      }
      await fetchData();
      handleClose();
    } catch (error) {
      console.error("Error adding/updating data:", error);
    }
  };

  const handleEditClick = (params) => {
    setFormData(params.row);
    setImagePreview(params.row.imageUrl);
    handleOpen();
  };

  const handleDelete = async (id) => {
    try {
      const rowToDelete = rows.find((row) => row.id === id);
      if (rowToDelete) {
        console.log(rowToDelete);
        await deleteWorker(rowToDelete.username);
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleSortClick = (field) => {
    const isAsc = sortModel[0]?.sort === "asc";
    setSortModel([{ field, sort: isAsc ? "desc" : "asc" }]);
  };

  const SortIcon = ({ direction }) => {
    return direction === "asc" ? <ArrowUpward /> : <ArrowDownward />;
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderHeader: () => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>ID</span>
          <IconButton onClick={() => handleSortClick("id")} size="small">
            <SortIcon
              direction={
                sortModel[0]?.field === "id" ? sortModel[0].sort : "asc"
              }
            />
          </IconButton>
        </div>
      ),
    },
    {
      field: "userNickName",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={params.row.imageUrl} style={{ marginRight: 8 }} />
          {params.row.userNickName}
        </div>
      ),
      renderHeader: () => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Name</span>
          <IconButton
            onClick={() => handleSortClick("userNickName")}
            size="small"
          >
            <SortIcon
              direction={
                sortModel[0]?.field === "userNickName"
                  ? sortModel[0].sort
                  : "asc"
              }
            />
          </IconButton>
        </div>
      ),
    },
    {
      field: "worktimeDay",
      headerName: "Date",
      width: 150,
      renderHeader: () => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Date</span>
          <IconButton
            onClick={() => handleSortClick("worktimeDay")}
            size="small"
          >
            <SortIcon
              direction={
                sortModel[0]?.field === "worktimeDay"
                  ? sortModel[0].sort
                  : "asc"
              }
            />
          </IconButton>
        </div>
      ),
    },
    {
      field: "hours",
      headerName: "Hours Worked",
      type: "number",
      width: 150,
      renderHeader: () => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Hours Worked</span>
          <IconButton onClick={() => handleSortClick("hours")} size="small">
            <SortIcon
              direction={
                sortModel[0]?.field === "hours" ? sortModel[0].sort : "asc"
              }
            />
          </IconButton>
        </div>
      ),
    },
    {
      field: "workerSalary",
      headerName: "Salary",
      type: "number",
      width: 150,
      renderHeader: () => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Salary</span>
          <IconButton
            onClick={() => handleSortClick("workerSalary")}
            size="small"
          >
            <SortIcon
              direction={
                sortModel[0]?.field === "workerSalary"
                  ? sortModel[0].sort
                  : "asc"
              }
            />
          </IconButton>
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200, // Increase the width to ensure buttons fit
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleEditClick(params)}
            sx={{
              width: "auto",
              backgroundColor: "#A1BBDE",
              margin: "10px",
              color: "white",
              fontSize: "11px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#344889",
              },
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(params.row.id)} // Pass params.row.id instead of params
            sx={{
              width: "auto",
              backgroundColor: "#E57373",
              margin: "10px",
              color: "white",
              fontSize: "11px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#C62828",
              },
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ height: 500, width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button
            onClick={handleOpen}
            sx={{
              width: "auto",
              backgroundColor: "#A1BBDE",
              margin: "10px",
              color: "white",
              "&:hover": {
                backgroundColor: "#344889",
              },
            }}
          >
            Add Worker
          </Button>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          sortingOrder={["asc", "desc"]}
          sortModel={sortModel}
          disableColumnMenu={true}
          getRowId={(row) => row.id} // Use 'id' as the row ID
        />

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <h2>{formData.id ? "Edit Worker" : "Add Worker"}</h2>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              type="password"
            />
            <TextField
              label="Name"
              name="userNickName"
              value={formData.userNickName}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="userAddress"
              value={formData.userAddress}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="userPhoneNumber"
              value={formData.userPhoneNumber}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Salary"
              name="workerSalary"
              value={formData.workerSalary}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              type="number"
            />
            <input
              accept="image/*"
              type="file"
              onChange={handleFileChange}
              style={{ margin: "16px 0" }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "16px",
                }}
              />
            )}
            <Button
              onClick={handleAddOrUpdate}
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#789CCD",
                "&:hover": { backgroundColor: "#344889" },
              }}
            >
              {formData.id ? "Update" : "Add"}
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default WorkerScreen;
