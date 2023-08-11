import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {
  AppBar,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
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
  alignItems: 'center',
});

const StyledIconButton = styled(IconButton)({
  color: '#fff',
  height: '3rem',
  width: '3rem',
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
          <StyledIconButton
            aria-label="Open nav menu"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <MenuOpenIcon color="inherit" />
            ) : (
              <MenuIcon color="inherit" />
            )}
          </StyledIconButton>
          <Typography variant="h1">DataGrid</Typography>
        </Flex>
        <Flex>
          <Tooltip arrow title="Toggle Light/Dark Mode">
            <StyledIconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </StyledIconButton>
          </Tooltip>
        </Flex>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default TopBar;
