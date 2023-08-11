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

const ListItemLevel1 = styled(MuiListItem)(({ theme }) => ({
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'all .2s',
  padding: '1rem',
  color: theme.palette.primary.dark,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
}));

const ListItemLevel2 = styled(ListItemLevel1)({
  paddingLeft: '2rem',
});

const ListItemHeader = styled(MuiListItem)({
  padding: '1rem',
});

interface SideBarProps {
  open: boolean;
}

const SideBar: FC<SideBarProps> = ({ open }) => {
  return (
    <Drawer open={open} variant="permanent">
      <List style={{ width: open ? '200px' : '0', transition: 'all .2s' }}>
        <Link href="/" passHref>
          <ListItemLevel1>Home</ListItemLevel1>
        </Link>
        <Divider />
        <ListItemHeader>Getting Started</ListItemHeader>
        <Link href="/docs/install" passHref>
          <ListItemLevel2>Install</ListItemLevel2>
        </Link>
        <Link href="/docs/props" passHref>
          <ListItemLevel2>All Props</ListItemLevel2>
        </Link>
        <Divider />

        <ListItemHeader>Examples</ListItemHeader>
        <Link href="/docs/examples/basic" passHref>
          <ListItemLevel2>Basic</ListItemLevel2>
        </Link>
      </List>
    </Drawer>
  );
};

export default SideBar;
