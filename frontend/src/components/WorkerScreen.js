import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Box, Modal, Avatar } from "@mui/material";
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
    workerPk: "",
    username: "",
    password: "",
    userNickName: "",
    userAddress: "",
    userPhoneNumber: "",
    workerSalary: 0,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [sortModel, setSortModel] = useState([{ field: "workerPk", sort: "asc" }]);
  const [pageSize, setPageSize] = useState(5);

  const fetchData = async () => {
    try {
      const response = await getWorkers();
      console.log("getWorkers response : ", response);
      const calculatedRows = response.map((row) => ({
        ...row,
        hours: calculateHours(row.worktimeStart, row.worktimeEnd),
        id: row.workerPK, // Use workerPK as the unique id
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
      workerPk: "",
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
    const newValue =
      name === "workerSalary" ? (value === "" ? 0 : Number(value)) : value;
    setFormData({ ...formData, [name]: newValue });
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
      return response.data.imgurl2;
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
      console.log("handleAddOrUpdate formData : ", formData);
    
      const updatedData = {
        ...formData,
        imageUrl,
        workerSalary: Number(formData.workerSalary),
      };
    
      if (formData.workerPk !== "" && formData.workerPk !== null && formData.workerPk !== undefined) {
        const updateData = {
          workerPK: formData.workerPk,
          userNickname: formData.userNickName,
          workerSalary: formData.workerSalary,
          imageUrl: formData.imageUrl,
        };
        console.log("Updating worker with data:", updateData);
        await updateWorker(updateData);
      } else {
        const addData = {
          username: formData.username,
          password: formData.password,
          userNickName: formData.userNickName,
          userAddress: formData.userAddress,
          userPhoneNumber: formData.userPhoneNumber,
          workerSalary: formData.workerSalary,
        };
        console.log("Adding worker with data:", addData);
        await addWorker(
          addData.username,
          addData.password,
          addData.userNickName,
          addData.userAddress,
          addData.userPhoneNumber,
          addData.workerSalary
        );
      }
      await fetchData();
      handleClose();
    } catch (error) {
      console.error("Error adding/updating data:", error);
    }
  };  

  const handleEditClick = (params) => {
    setFormData({
      workerPk: params.row.workerPK,
      username: params.row.username,
      password: params.row.password,
      userNickName: params.row.userNickName,
      userAddress: params.row.userAddress,
      userPhoneNumber: params.row.userPhoneNumber,
      workerSalary: params.row.workerSalary,
      imageUrl: params.row.imageUrl,
    });
    setImagePreview(params.row.imageUrl);
    handleOpen();
  };
  

  const handleDelete = async (id) => {
    try {
      const rowToDelete = rows.find((row) => row.workerPK === id);
      if (rowToDelete) {
        console.log(rowToDelete);
        await deleteWorker(rowToDelete.username);
        setRows((prevRows) => prevRows.filter((row) => row.workerPK !== id));
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  

  const handleSortModelChange = (model) => {
    setSortModel(model);
  };

  const columns = [
    {
      field: "workerPK",
      headerName: "ID",
      width: 90,
    },
    {
      field: "userNickName",
      headerName: "성함",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={params.row.imageUrl} style={{ marginRight: 8 }} />
          {params.row.userNickName}
        </div>
      ),
    },
    {
      field: "worktimeDay",
      headerName: "날짜",
      width: 150,
    },
    {
      field: "hours",
      headerName: "일한 시간",
      type: "number",
      width: 150,
    },
    {
      field: "workerSalary",
      headerName: "급여",
      type: "number",
      width: 150,
    },
    {
      field: "actions",
      headerName: "동작",
      width: 200,
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
            수정
          </Button>
          <Button
            onClick={() => handleDelete(params.row.workerPK)}
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
            삭제
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
            강사 추가
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
          onSortModelChange={handleSortModelChange}
          getRowId={(row) => row.workerPK}
        />

        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <h2>{formData.workerPk !== "" && formData.workerPk !== null && formData.workerPk !== undefined ? "Edit Worker" : "Add Worker"}</h2>
            <TextField
              label="유저이름"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="비밀번호"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              type="password"
            />
            <TextField
              label="성함"
              name="userNickName"
              value={formData.userNickName}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="주소"
              name="userAddress"
              value={formData.userAddress}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="개인전화번호"
              name="userPhoneNumber"
              value={formData.userPhoneNumber}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="급여"
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
              {formData.workerPk !== "" && formData.workerPk !== null && formData.workerPk !== undefined ? "업데이트" : "추가"}
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default WorkerScreen;
