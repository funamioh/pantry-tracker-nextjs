"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  Autocomplete,
  IconButton,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// the following line requires additional config. Will work on this later
// import { DeleteIcon, EditIcon, AddCircleIcon, RemoveCircleIcon } from '@mui/icons-material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CameraComponent from "./CameraComponent";
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { firestore } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filteredInventory, setFilteredInventory] = useState([]);

  const [items, setItems] = useState([inventory]);
  const [editItem, setEditItem] = useState(null);

  const [edit, setEdit] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState(quantity);
  const [document, setDocument] = useState(null);

  // We'll add our component logic here

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
    console.log(inventoryList, "inventory list");
    // setCount for each item in inventoryList
    inventoryList.forEach((item) => {
      setCount(item.quantity);
    });
  };

  // We should not do updateInventorty every time quantity changes. Because it fetches the quantity from firebase every time.
  useEffect(() => {
    updateInventory();
  }, []);

  // When a value is input to filter, shows only items that match input value
  useEffect(() => {
    setFilteredInventory(
      inventory.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, inventory]);

  useEffect(() => {
    if (modalOpen) {
      console.log("Modal is open now");
    }
  }, [modalOpen])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  // useEffect(() => {
  //   setCount(quantity); // Update count whenever quantity changes
  //   console.log(count, "count = quantity");
  // }, [quantity]);

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await deleteDoc(docRef);
    }
    await updateInventory();
  };

  const handleCameraOpen = () => setCameraOpen(true);
  const handleCameraClose = () => setCameraOpen(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
    >
      <Typography id="app-title" variant="h3" component="h3">
        Pantry Tracker
      </Typography>
      <Modal open={cameraOpen} onClose={handleCameraClose}>
        <CameraComponent />
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box
        width="800px"
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={2}
      >
        <Button variant="contained" onClick={handleCameraOpen}>
          Camera
        </Button>
        {/* <IconButton aria-label="camera">
        <CameraAltIcon fontSize="inherit" />
      </IconButton> */}
        <Button variant="contained" onClick={handleOpen}>
          Add New Item
        </Button>
        <Autocomplete
          disablePortal
          options={inventory.map((item) => item.name)}
          value={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="item" />}
        />
      </Box>
      <Box
        width="80%"
        display={"flex"}
        sx={{ border: '2px solid grey', borderRadius: '4px', backgroundColor: '#85EA85' }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width:70 }}>No.</TableCell>
              <TableCell align="center" sx={{ width:200 }}>Name</TableCell>
              <TableCell align="center" sx={{ width:400 }}>Quantity</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map(({ name, quantity }, index) => (
              <TableRow
                key={name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{name}</TableCell>
                {editItem === name ? (
                  <TableCell align="center">
                    <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton
                  aria-label="decrease"
                  onClick={() => setCount((q) => q - 1)}
                >
                  <RemoveCircleIcon />
                </IconButton>
                <Typography>{count}</Typography>
                <IconButton
                    aria-label="increase"
                    onClick={() => setCount((q) => q + 1)}
                  >
                    <AddCircleIcon />
                  </IconButton>
                  <Button variant="outlined"
                  onClick={async () => {
                    setEditItem(null);
                    setEdit(false);
                    setQuantity(count);
                    console.log(count, "count");
                    try {
                      const docRef = doc(collection(firestore, "inventory"), name);
                      await setDoc(docRef, { quantity: count });
                      await updateInventory();
                    } catch (error) {
                      console.error("Error updating document: ", error);
                    }
                  }}>
                    Save
                  </Button></Stack></TableCell>
                ) : (
                  <TableCell align="center"><Typography>
                {quantity}
                </Typography></TableCell>
                )}

                <TableCell align="center">
                  <IconButton aria-label="edit" onClick={() => {setEditItem(name);
                        setCount(quantity); // Initialize count with current quantity
                        }}>
                    <EditIcon />
                  </IconButton>

                  {/* once the delete button is hit, modal pops up and confirm delete */}
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      setModalOpen(true);
                      console.log(setModalOpen, "setModalOpen");
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {modalOpen &&
                  <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Is it ok to delete this item?
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <Button
              variant="outlined"
              onClick={() => {
                removeItem(name);
                setModalOpen(false);
              }}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
      }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </Box>
  );
}
