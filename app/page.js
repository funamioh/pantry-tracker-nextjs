"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Sheet,
  Stack,
  Table,
  Typography,
  Button,
  Modal,
  TextField,
  Autocomplete,
  IconButton
} from "@mui/material";
// the following line requires additional config. Will work on this later
// import { DeleteIcon, EditIcon, AddCircleIcon, RemoveCircleIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CameraComponent from "./CameraComponent"
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
  const [cameraOpen, setCameraOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filteredInventory, setFilteredInventory] = useState([]);

  const [edit, setEdit] = useState(false)
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
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
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
      <Modal
        open={cameraOpen}
        onClose={handleCameraClose}
      >
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
      {/* <Sheet
      variant="solid"
      color="primary"
      invertedColors
      sx={{
        pt: 1,
        borderRadius: 'sm',
        transition: '0.3s',
        background: (theme) =>
          `linear-gradient(45deg, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.primary[400]})`,
        '& tr:last-child': {
          '& td:first-child': {
            borderBottomLeftRadius: '8px',
          },
          '& td:last-child': {
            borderBottomRightRadius: '8px',
          },
        },
      }}
    >
      <Table stripe="odd" hoverRow>
        <caption>Nutrition of your favorite menus.</caption>
        <thead>
          <tr>
            <th style={{ width: '20%' }}>Item</th>
            <th>Name</th>
            <th>Quantity</th>
            <th
                aria-label="last"
                style={{ width: 'var(--Table-lastColumnWidth)' }}
              />
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map(({name, quantity}) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{quantity}</td>
              <td>{quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet> */}

      <Box border={"1px solid #333"}>
        <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
          {filteredInventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
              paddingX={5}
            >
              <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>

              {/* If edit btn is clicked, qty changes to editable form */}
              {edit ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    pt: 4,
                    mb: 2
                  }}
                >
                  <IconButton aria-label="plus" onClick={() => setCount((q) => q - 1)}>
                  <RemoveCircleIcon />
                  </IconButton >

                  <Typography fontWeight="md">{count}</Typography>
                  <IconButton aria-label="plus" onClick={() => setCount((q) => q + 1)}>
                  <AddCircleIcon />
                  </IconButton >

                  <Button variant="outlined"
                  onClick={async () => {
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
                  </Button>
                </Box>
              ) : (
                <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                  Quantity: {quantity}
                </Typography>
              )}

              <IconButton aria-label="edit" onClick={() => setEdit(true)}>
              <EditIcon />
              </IconButton>

              {/* once the delete button is hit, modal pops up and confirm delete */}
              <IconButton aria-label="delete" onClick={() => removeItem(name)}>
              <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
