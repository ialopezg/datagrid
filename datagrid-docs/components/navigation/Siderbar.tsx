import {
  Divider,
  Drawer as MuiDrawer,
  List as MuiList,
  ListItem as MuiListItem,
  styled,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';

const Drawer = styled(MuiDrawer)({
  zIndex: 1,
  position: 'relative',
});

const List = styled(MuiList)({
  paddingTop: '80px 0',
});

const ListItem = styled(MuiListItem)({
  cursor: 'pointer',
  transition: 'all .2s',
  padding: '1rem',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
});

interface SideBarProps {
  open: boolean;
}

const SideBar: FC<SideBarProps> = ({ open }) => {
  return (
    <Drawer open={open} variant="permanent">
      <List style={{ width: open ? '200px' : '0', transition: 'all .2s' }}>
        <Link href="/" passHref>
          <ListItem>Home</ListItem>
        </Link>
        <Divider />
        <Link href="/docs/getting-started" passHref>
          <ListItem>Getting Started</ListItem>
        </Link>
        <Link href="/docs/install" passHref>
          <ListItem>Install</ListItem>
        </Link>
        <Divider />

        <Typography>Examples</Typography>

        <Link href="/docs/examples/basic" passHref>
          <ListItem>Basic</ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default SideBar;
