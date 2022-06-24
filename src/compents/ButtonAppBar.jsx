import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import LogoItaipu from '../assets/logoitaipu.png'

export default function ButtonAppBar() {
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
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Piracema
                    </Typography>
                    <img src={LogoItaipu} width="50px" height="50px"  alt="Logo itaipu"/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
