import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import AdminDetails from "./AdminDetails";
import AddAdmin from "./AddAdmin";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ViewAdmins from "./ViewAdmins";
import axios from "axios";

export default function AccountMenu({ handleSignOut, isLoggedIn, uid }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [detailsModal, setdetailsModal] = React.useState(false);
  const [addAdmin, setAddAdmin] = React.useState(false);
  const [viewingAdmin, setViewingAdmin] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});
  const [isSysAdmin, setIsSysAdmin] = React.useState(false);

  //   if (userInfo.sysAdmin === "true") {
  //     setIsSysAdmin(true);
  //   }

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    console.log("look", userInfo);
  };
  const handleActivate = () => {
    setdetailsModal(!detailsModal);
  };
  const handleAddAdmin = () => {
    setAddAdmin(!addAdmin);
  };
  const handleViewingAdmin = () => {
    setViewingAdmin(!viewingAdmin);
  };

  const fetchAdminData = async () => {
    try {
      const response = await axios.get(`https://employee-reg-backend.onrender.com/admin/${uid}`);
      setUserInfo(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchAdminData();
    // console.log(uid);
  }, []);

  React.useEffect(() => {
    if (userInfo.sysAdmin === "true") {
      setIsSysAdmin(true);
    } else {
      setIsSysAdmin(false);
    }
  }, [userInfo]);
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleActivate}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        {isSysAdmin && (
          <div>
            <MenuItem onClick={handleAddAdmin}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another admin
            </MenuItem>
            <MenuItem onClick={handleViewingAdmin}>
              <ListItemIcon>
                <SupervisorAccountIcon fontSize="small" />
              </ListItemIcon>
              View current admins
            </MenuItem>
          </div>
        )}
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      {detailsModal && (
        <AdminDetails
          handleActivate={handleActivate}
          isLoggedIn={isLoggedIn}
          uid={uid}
          userInfo={userInfo}
        />
      )}
      {addAdmin && <AddAdmin handleAddAdmin={handleAddAdmin} />}
      {viewingAdmin && <ViewAdmins handleActivate={handleViewingAdmin} />}
    </React.Fragment>
  );
}
