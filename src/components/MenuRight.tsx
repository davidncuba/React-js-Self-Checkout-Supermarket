import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function MenuRight() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOnClickProduct = React.useCallback(() => {
    handleClose();
    navigate("/product", { replace: true });
  }, [navigate]);

  const handleOnClickPricePromotions = React.useCallback(() => {
    handleClose();
    navigate("/price", { replace: true });
  }, [navigate]);

  const handleOnClickCheckout = React.useCallback(() => {
    handleClose();
    navigate("/checkout", { replace: true });
  }, [navigate]);
  const handleOnClickHome = React.useCallback(() => {
    handleClose();
    navigate("/", { replace: true });
  }, [navigate]);
  return (
    <Box sx={{ display: "flex", justifyContent: "right" }}>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SettingsIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOnClickHome}>Home</MenuItem>
        <Divider />
        <MenuItem onClick={handleOnClickCheckout}>Checkout</MenuItem>
        <Divider />
        <MenuItem onClick={handleOnClickProduct}>Product</MenuItem>
        <Divider />
        <MenuItem onClick={handleOnClickPricePromotions}>
          Price/Promotions
        </MenuItem>
      </Menu>
    </Box>
  );
}
