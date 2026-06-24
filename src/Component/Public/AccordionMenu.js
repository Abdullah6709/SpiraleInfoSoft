import React, { useState } from "react";
import { Remove, Add } from "@mui/icons-material";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import menuData from "../Public/MenuData";
import Logo from "../../assest/spiralenewlogo.webp";

const AccordionMenu = ({ onClose }) => {
    const [openMenus, setOpenMenus] = useState({});
    const navigate = useNavigate();

    const toggleMenu = (index) => {
        setOpenMenus((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleNavigation = (route) => {
        if (route) {
            navigate(route);
            window.scrollTo(0, 0);
            onClose();
        }
    };

    const logoUpto = () => {
        window.scrollTo(0, 0);
        navigate('/');
        onClose();
    };

    const renderMenu = (menu, index) => (
        <Box key={index}>
            <Box
                sx={{ width: "100%", py: 1, px: 2 }}
                onClick={() => {
                    if (!menu.subMenu) handleNavigation(menu.route);
                }}
            >
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => menu && toggleMenu(index)}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {menu.icon && (
                            <span style={{ marginRight: "8px" }}>{menu.icon}</span>
                        )}
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {menu.name}
                        </Typography>
                    </Box>

                    {menu.subMenu && (
                        openMenus[index] ? (
                            <Remove style={{ fontSize: "16px", color: "#555" }} />
                        ) : (
                            <Add style={{ fontSize: "16px", color: "#555" }} />
                        )
                    )}
                </Stack>

                {menu.subMenu && openMenus[index] && (
                    <Box sx={{ width: "100%", pl: 2 }} onClick={() => {
                        if (menu.subMenu.route) handleNavigation(menu.subMenu.route);
                    }}>
                        {menu.subMenu.map((subMenu, subIndex) =>
                            renderMenu(subMenu, `${index}-${subIndex}`)
                        )}
                    </Box>
                )}
            </Box>
            <Divider sx={{ backgroundColor: "#ddd" }} />
        </Box>
    );

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            {/* Header Section with Logo */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    py: 1,
                    borderBottom: "1px solid #ddd",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={Logo}
                        alt="Logo"
                        style={{ height: "50px", width: "180px", cursor: "pointer" }}
                        onClick={logoUpto}
                    />
                </Box>
            </Box>

            {/* Menu Items - Changed from Typography to Box */}
            <Box sx={{ flexGrow: 1, overflowY: "auto", pt: 1 }}>
                {menuData.map((menu, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                        {renderMenu(menu, index)}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default AccordionMenu;