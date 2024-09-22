import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Typography, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { useAppStore } from '../appStore';
import CloudIcon from '@mui/icons-material/Cloud';

const AppBar = styled(MuiAppBar, {
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));


export default function NavBar({ pageName }) {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen)
  const [page, setPage] = React.useState("Home");
  React.useEffect(() => {
    setPage(pageName)
  }, [pageName]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                SpeedCheck
              </Typography>
            </Grid>
            <Grid item>
              <CloudIcon sx={{marginTop:'30'}} />
            </Grid>
            <Grid item>
              
              <Typography  variant="h3" sx={{ marginLeft: 85,marginTop:1 }}>
                {page}
              </Typography>
            </Grid>

          </Grid>

        </Toolbar>
      </AppBar>
    </Box>
  );


}

