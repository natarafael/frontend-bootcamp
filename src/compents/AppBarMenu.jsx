import React, {useState} from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoItaipu from '../assets/logoitaipu.png'
import {Menu, MenuItem, ProSidebar} from "react-pro-sidebar";
import {MdDashboard, MdOutlineSettingsInputAntenna} from "react-icons/md";
import {Link} from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";
import {AppBar} from "@mui/material";
import {IoFishOutline} from "react-icons/io5";
import {GrStatusGood} from "react-icons/gr";
import {HiOutlineLocationMarker} from "react-icons/hi";

export default function AppBarMenu() {
    const [show, setShow] = useState(false)
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="inherit"
                        style={{ width: "100%" }}
            >
                <Toolbar
                    sx={{
                        backgroundColor: "#caf0f8",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setShow(!show)}
                    >
                        <MenuIcon  />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Piracema
                    </Typography>
                    <img src={LogoItaipu} width="50px" height="50px"  alt="Logo itaipu"/>
                </Toolbar>
            </AppBar>
            <div
                style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <ProSidebar collapsed={show}>
                    <Menu iconShape="circle">
                        <MenuItem icon={<MdDashboard />} onClick={() => !show && setShow(!show) }>
                            <Link to="/" />
                            Página Inicial
                        </MenuItem>
                        <MenuItem icon={<IoFishOutline />} onClick={() => !show && setShow(!show) }>
                            <Link to="/fishes" />
                            Peixes
                        </MenuItem>
                        <MenuItem icon={<MdOutlineSettingsInputAntenna />} onClick={() => !show && setShow(!show) }>
                            <Link to="/antennas" />
                            Antenas
                        </MenuItem>
                        <MenuItem icon={<HiOutlineLocationMarker />} onClick={() => !show && setShow(!show) }>
                            <Link to="/passes" />
                            Passagens
                        </MenuItem>

                        <MenuItem icon={<GrStatusGood />} onClick={() => !show && setShow(!show) }>
                            <Link to="/status" />
                            Status de Antenas
                        </MenuItem>
                    </Menu>
                </ProSidebar>
                <AppRoutes/>
            </div>
        </Box>
    );
}
