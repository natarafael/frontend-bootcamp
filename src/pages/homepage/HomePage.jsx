import {Box, Typography} from "@mui/material";


const HomePage = () => {

    return(
        <>
        <Box display="flex" flexDirection="row" flexWrap="wrap" width="60%"
             height="800px"
             textAlign="center"
             sx={{
                backgroundColor: "#caf0f8",
                 marginLeft: "300px",
                 marginTop:"75px",
                 padding: "10px",
                 alignItems: 'center',
                 border: '6px solid white',
                 borderRadius:'10px',
                 opacity: "80%",
        }}
        >
            <Typography p={2} marginTop="5%" marginLeft="270px" variant="h1">
                PIRACEMA
            </Typography>
            <Typography p={2} variant="h3" marginLeft="100px">
                Plataforma de Monitoramento de Peixes
            </Typography>
            <Typography p={4} variant="h5" textAlign="justify">
                Plataforma Web desenvolvida para o monitoramento de peixes que circulam no canal da Piracema
            </Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-around">
                <Typography margin="100px">
                    <img
                        src="https://www.pti.org.br/wp-content/uploads/2021/03/LOGO_PTI_0.png"
                        alt="logo pti"
                        width="400px"
                    />
                </Typography>
                <Typography margin="100px">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Logo_Itaipu_Preferencial.svg/1200px-Logo_Itaipu_Preferencial.svg.png"
                        alt="logo itaipu"
                        width="250px"

                    />
                </Typography>
            </Box>
        </Box>
        </>
    )
}
export  default HomePage;