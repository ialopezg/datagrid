import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AppBar, IconButton, styled, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { FC } from 'react';

const StyledAppBar = styled(AppBar)({
  zIndex: 2,
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Flex = styled('div')({
  display: 'flex',
});

const StyledIconButton = styled(IconButton)({
  color: '#fff',
});

interface TopBarProps {
  darkMode: boolean;
  open: boolean;
  setDarkMode: (value: boolean) => void;
  setOpen: (value: boolean) => void;
}

const TopBar: FC<TopBarProps> = ({
  darkMode,
  open,
  setDarkMode,
  setOpen,
}: TopBarProps) => {
  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <Flex>
          <StyledIconButton onClick={() => setOpen(!open)}>
            {open ? (
              <MenuOpenIcon color="inherit" />
            ) : (
              <MenuIcon color="inherit" />
            )}
          </StyledIconButton>
          <Typography
            style={{ fontSize: '2rem', paddingLeft: '1.5rem' }}
            variant="h1"
          >
            DataGrid
          </Typography>
        </Flex>
        <Flex>
          <StyledIconButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </StyledIconButton>
        </Flex>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default TopBar;
