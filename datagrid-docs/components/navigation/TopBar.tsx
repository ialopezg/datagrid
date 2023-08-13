import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {
  AppBar,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Link from 'next/link';
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
  gap: '0.5rem',
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
  const isDesktop = useMediaQuery('(min-width: 1600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar variant={isTablet ? 'dense' : 'regular'}>
        <Flex>
          {!isDesktop && (
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
          )}

          <Link href="/" passHref>
            <Typography
              style={{
                cursor: 'pointer',
                fontSize: isTablet ? '1.6rem' : undefined,
              }}
              variant="h1"
            >
              {isMobile ? 'DG' : 'DataGrid'}
            </Typography>
          </Link>
        </Flex>
        <Flex>
          <Tooltip arrow title="Github">
            <a href="https://github.com/ialopezg/datagrid" target="_blank">
              <IconButton aria-label="Github">
                <img
                  height={30}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                  }}
                  src="/media/icons/github.svg"
                  alt="Github"
                />
              </IconButton>
            </a>
          </Tooltip>
          <Tooltip arrow title="Discord">
            <a href="https://discord.gg/ialopezg" target="_blank">
              <IconButton aria-label="Discord">
                <img
                  height={25}
                  style={{
                    padding: '-3px',
                    borderRadius: '50%',
                  }}
                  src="/media/icons/discord.svg"
                  alt="Discord"
                />
              </IconButton>
            </a>
          </Tooltip>
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
