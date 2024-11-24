/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import { biddingCalc, formatDate, projectBudget as pb } from "../utils/util";

export default function DataTable({
  data,
  page,
  rowsPerPage,
  onPageChange,
  totalRows,
  name,
  link,
  projectType,
  projectBudget,
  bid,
  country,
  created,
  createdBy,
  bidDelay,
  projectStatus,
  dealStatus,
  burgerIcon,
  onClick,
  handleNameClick,
  handleLinkClick,
  handleProjectTypeClick,
  handleProjectBudgetClick,
  handleBidClick,
  handleCountryClick,
  handleCreatedClick,
  handleCreatedByClick,
  handleBidDelayClick,
  handleProjectStatusClick,
  handleDealStatusClick,
  lists,
}) {
  return (
    <>
    <div className="relative">
      <div
        className="flex justify-end px-6 text-xl font-bold cursor-pointer"
        onClick={onClick}
      >
        {burgerIcon ? "=" : "X"}
      </div>
      {!burgerIcon ? (
        <div className="absolute right-0 z-10 flex flex-col gap-4 px-12 py-4 shadow-xl bg-slate-200 rounded-xl">
          {lists.map(({ name, handler, state }) => (
            <div key={name}>
              <input
                type="checkbox"
                checked={state} 
                onChange={handler}
              />
              <span className="ml-4">{name}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
    <Paper sx={{ width: "100%", overflow: "hidden" }} className="pt-6">
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              {name && <TableCell>Name</TableCell>}
              {link && <TableCell>Project Link</TableCell>}
              {projectType && <TableCell>Project Type</TableCell>}
              {projectBudget && <TableCell>Project Budget</TableCell>}
              {bid && <TableCell>Bid Value</TableCell>}
              {country && <TableCell>Country</TableCell>}
              {created && <TableCell>Created</TableCell>}
              {createdBy && <TableCell>Created By</TableCell>}
              {bidDelay && <TableCell>Bidding Delay Time</TableCell>}
              {projectStatus && <TableCell>Status</TableCell>}
              {dealStatus && <TableCell>Deal Status</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                {name && <TableCell>{row.client_name}</TableCell>}
                {link && (
                  <TableCell>
                    <a
                      href={row.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1e88e5" }}
                    >
                      {row.project_link}
                    </a>
                  </TableCell>
                )}
                {projectType && <TableCell>{row.project_type}</TableCell>}
                {projectBudget && (
                  <TableCell>
                    {pb(row.actual_value, row.bid_value, row.bid_value2)}
                  </TableCell>
                )}
                {bid && (
                  <TableCell>${row.bid_value2 - row.bid_value}</TableCell>
                )}
                {country && <TableCell>{row.country}</TableCell>}
                {created && <TableCell>{formatDate(row.created_at)}</TableCell>}
                {createdBy && (
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        alt={row.createdBy}
                        src={row.image_url}
                        sx={{ width: 24, height: 24, mr: 2 }}
                      />
                      <Typography variant="body2">
                        Gazi Mahfuzur Rahman
                      </Typography>
                    </Box>
                  </TableCell>
                )}
                {bidDelay && (
                  <TableCell>
                    {biddingCalc(row.bidding_minutes, row.bidding_seconds)}
                  </TableCell>
                )}
                {projectStatus && (
                  <TableCell>
                    <Chip
                      label={
                        row.deal_status === 1
                          ? "Converted to Deal"
                          : "Not Converted to Deal"
                      }
                      color={row.deal_status === 1 ? "success" : "error"}
                      variant="filled"
                    />
                  </TableCell>
                )}
                {dealStatus && (
                  <TableCell>
                    <Chip
                      label={
                        row.deal_status === 1
                          ? "No Activity Yet"
                          : "Not Applicable"
                      }
                      color={row.deal_status === 1 ? "warning" : ""}
                      variant="filled"
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
      />
    </Paper>
    </>

  );
}
