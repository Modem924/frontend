import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
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
import { getWorkers, addWorker, updateWorker } from "./api";
import axios from "axios";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const initialRows = [
  {
    id: 1,
    userNickName: "John Doe",
    worktimeDay: "2023-07-21",
    workerSalary: 50000,
    hours: 9,
    imageUrl: "",
  },
  {
    id: 2,
    userNickName: "Jane Smith",
    worktimeDay: "2023-07-22",
    workerSalary: 60000,
    hours: 10,
    imageUrl: "",
  },
];

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

// const calculateHours = (start, end) => {
//   // 다양한 형식을 지원하기 위해 시간 문자열을 파싱
//   const startFormats = ["HH:mm:ss.SSS", "HH:mm:ss", "HH:mm"];
//   const endFormats = ["HH:mm:ss.SSS", "HH:mm:ss", "HH:mm"];

//   let startTime, endTime;

//   for (const format of startFormats) {
//     startTime = dayjs(start, format);
//     console.log(`Hours worked: ${startTime} hours`);
//     if (startTime.isValid()) break;
//   }

//   for (const format of endFormats) {
//     endTime = dayjs(end, format);
//     if (endTime.isValid()) break;
//   }

//   if (!startTime.isValid() || !endTime.isValid()) {
//     console.error("Invalid date format");
//     return NaN;
//   }

//   const diff = dayjs.duration(endTime.diff(startTime));
//   const hours = diff.asHours();

//   return hours;
// };

const calculateHours = (start, end) => {
  return end.substring(0, 2) - start.substring(0, 2);
};

const WorkerScreen = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  // 추가랑 업데이트할 때 관리
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
      console.log(response);
      const calculatedRows = response.map((row) => ({
        ...row,
        hours: calculateHours(row.worktimeStart, row.worktimeEnd),

        id: row.workerPk, // Ensure each row has a unique id
      }));
      console.log(calculatedRows.hours);
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

  // ///////사용자가 선택한 파일 (binary) 형식
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://dstj-env.eba-bienmeha.ap-northeast-2.elasticbeanstalk.com/upload",
        formData,
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
      let imageUrl = formData.imgurl2;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const data = { ...formData, imageUrl }; //update 용 수정
      const { id, ...dataWithoutId } = formData;
      const add_data = dataWithoutId;
      console.log("add post 요청 시", add_data);

      if (formData.id) {
        // Update row using POST request
        const updateData = {
          workerPK: formData.id,
          userNickname: formData.userNickName,
          workerSalary: Number(formData.workerSalary), //숫자
        };
        const response = await updateWorker(updateData);
        await fetchData();
        // setRows((prevRows) =>
        //   prevRows.map((row) =>
        //     row.id === formData.id
        //       ? { ...row,
        //           ...response,//data임
        //           hours: calculateHours(
        //             response.worktimeStart,
        //             response.worktimeEnd
        //           ),
        //         }
        //       : row
        //   )
        // );
      } else {
        // Add new row using POST request
        const response = await addWorker(add_data);
        const newId = response.data.id;
        setRows((prevRows) => [
          ...prevRows,
          {
            ...response.data,
            id: newId,
            hours: calculateHours(
              response.data.worktimeStart,
              response.data.worktimeEnd
            ),
          },
        ]);
      }

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
      await axios.delete(`/api/employees/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
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
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditClick(params)}>Edit</Button>
          <Button onClick={() => handleDelete(params.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <NavigationBar />
      <div style={{ height: 400, width: "100%" }}>
        <Button onClick={handleOpen}>Add Employee</Button>
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
          getRowId={(row) => row.workerPk} // Add this line to use workerPk as the row ID
        />

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <h2>{formData.id ? "Edit Employee" : "Add Employee"}</h2>
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
