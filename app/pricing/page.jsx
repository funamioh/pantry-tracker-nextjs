"use client"

import 'flowbite/dist/flowbite.min.js';
import 'flowbite/dist/flowbite.css';
import '../globals.css';

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
  colors,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import NavbarDemo from "../../components/Header";
import Footer from "../../components/Footer";

export default function Pricing() {
  return (
    <Box height="100vh">
    <NavbarDemo />
    <Box
      width="100vw"
      paddingY={5}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      style={{ backgroundColor: '#F5F5DC' }}
      gap={2}
    >
      <Typography variant="h2" color="primary">
        Pricing
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary">
          Monthly
        </Button>
        <Button variant="outlined" color="primary">
          Yearly
        </Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Plan</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Features</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Basic</TableCell>
              <TableCell>$10</TableCell>
              <TableCell>
                <ul>
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </ul>
              </TableCell>
              <TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pro</TableCell>
              <TableCell>$20</TableCell>
              <TableCell>
                <ul>
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </ul>
              </TableCell>
              <TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Enterprise</TableCell>
              <TableCell>$30</TableCell>
              <TableCell>
                <ul>
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </ul>
              </TableCell>
              <TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary">
        <AddCircleIcon />
        Add Plan
      </Button>
    </Box>
    <Footer />
    </Box>
)
}
