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

const ListItem = styled(MuiListItem)(({ theme }) => ({
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'all .2s',
  padding: '1rem',
  color: theme.palette.primary.dark,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
}));

const ListItemHeader = styled(MuiListItem)({
  padding: '1rem',
});

const ListItemExamples = styled(ListItem)({
  paddingLeft: '2rem',
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

        <ListItemHeader>Examples</ListItemHeader>
        <Link href="/docs/examples/basic" passHref>
          <ListItemExamples>Basic</ListItemExamples>
        </Link>
      </List>
    </Drawer>
  );
};

export default SideBar;
