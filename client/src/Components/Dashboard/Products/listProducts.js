import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function createData(name, price, stock, state) {
	return {
		name,
		price,
		stock,
		state,
		history: [
			{
				date: "2020-01-05",
				customerId: "11091700",
				amount: 3,
			},
			{
				date: "2020-01-02",
				customerId: "Anonymous",
				amount: 1,
			},
		],
	};
}

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" }}}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					<Grid2>
						imagen
						{row.imagen}
					</Grid2>
					<Grid2>
						nombre
						{row.nombre}
					</Grid2>
				</TableCell>
				<TableCell align="right">{row.stock}</TableCell>
				<TableCell align="right">{row.importe}</TableCell>
				<TableCell align="right">{row.status}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 , width:"100%"}} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 2, width: "100%" }}>
							<Typography variant="h6" gutterBottom component="div">
								Basic details
							</Typography>
							<Grid2 container gap>
								<Grid2 >
									<TextField
										label="Product name"
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</Grid2>
								<Grid2 >
									<TextField
										label="Category"
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</Grid2>
								<Grid2 >
									<TextField
										type="number"
										label="Old price"
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</Grid2>
								<Grid2>
									<TextField
										type="number"
										label="New price"
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</Grid2>
								<Grid2 xs={12} px={8}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											padding: "5",
										}}
									>
										<Button>Update</Button>
										<Button sx={{ color: "red" }}>Delete</Button>
									</Box>
								</Grid2>
							</Grid2>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

Row.propTypes = {
	row: PropTypes.shape({
		name: PropTypes.string.isRequired,
		stock: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		status: PropTypes.string.isRequired,
	}).isRequired,
};

export default function ListProducts(products) {
	const rows = [];
	for (const product of products) {
		rows.push(createData(product.nombre,product.stock, product.importe,product.estado))
	}
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow sx={{bgcolor:"#319795", color:"white",}}>
						<TableCell />
						<TableCell>NAME</TableCell>
						<TableCell align="right">STOCK</TableCell>
						<TableCell align="right">PRICE</TableCell>
						<TableCell align="right">STATUS</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row key={row.name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}