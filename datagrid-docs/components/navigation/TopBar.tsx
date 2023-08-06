import {
  AppBar as MuiAppBar,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { FC } from 'react';

const AppBar = styled(MuiAppBar)({
  zIndex: 2,
});

interface TopBarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const TopBar: FC<TopBarProps> = ({ open, setOpen }: TopBarProps) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton onClick={() => setOpen(!open)} style={{ color: '#fff' }}>
          {open ? (
            <MenuOpenIcon color="inherit" />
          ) : (
            <MenuIcon color="inherit" />
          )}
        </IconButton>
        <Typography
          style={{ fontSize: '2rem', paddingLeft: '1.5rem' }}
          variant="h1"
        >
          Material React Table
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
