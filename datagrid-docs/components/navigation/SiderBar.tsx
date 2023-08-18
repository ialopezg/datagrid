import {
  alpha,
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItem as MuiListItem,
  styled,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';

const Drawer = styled(MuiDrawer)({
  zIndex: 1,
  position: 'relative',
});

const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== 'navOpen',
})<{ navOpen?: boolean }>(({ navOpen }) => ({
  overflow: 'visible',
  overflowY: navOpen ? 'auto' : 'hidden',
  padding: '68px 0',
  transition: 'all .2s',
  width: navOpen ? '260px' : '0',
  'media (max-width: 990px)': {
    marginTop: '50px',
  },
}));

const ListItemLevel1 = styled(MuiListItem)(({ theme }) => ({
  color: theme.palette.primary.dark,
  cursor: 'pointer',
  fontWeight: 'bold',
  padding: '1rem',
  transition: 'all 0.3s ease-in-ou',
  whitespace: 'nowrap',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const ListItemLevel2 = styled(ListItemLevel1)({
  paddingLeft: '2rem',
});

const ListItemHeader = styled(MuiListItem)({
  padding: '1rem',
  whitespace: 'nowrap',
});

interface SideBarProps {
  navOpen: boolean;
  setNavOpen: (value: boolean) => void;
}

const SideBar: FC<SideBarProps> = ({ navOpen, setNavOpen }) => {
  const isTablet = useMediaQuery('(max-width: 990px)');

  return (
    <Drawer
      onClose={() => setNavOpen(false)}
      open={navOpen}
      PaperProps={{ component: 'aside' }}
      variant={isTablet ? 'temporary' : 'permanent'}
    >
      <StyledList navOpen={navOpen}>
        <Link href="/" passHref>
          <ListItemLevel1>Home</ListItemLevel1>
        </Link>
        <Link href="/about" passHref>
          <ListItemLevel1>About &amp; FAQ</ListItemLevel1>
        </Link>

        <Divider />

        <ListItemHeader>Getting Started</ListItemHeader>
        <Link href="/docs/install" passHref>
          <ListItemLevel2>Install</ListItemLevel2>
        </Link>
        <Link href="/docs/usage" passHref>
          <ListItemLevel2>Usage</ListItemLevel2>
        </Link>
        <Link href="/docs/props" passHref>
          <ListItemLevel2>All Props</ListItemLevel2>
        </Link>

        <Divider />

        <ListItemHeader>Examples</ListItemHeader>
        <Link href="/docs/examples/basic" passHref>
          <ListItemLevel2>Basic Example</ListItemLevel2>
        </Link>
        <Link href="/docs/examples/minimal" passHref>
          <ListItemLevel2>Minimal Example</ListItemLevel2>
        </Link>
        <Link href="/docs/examples/advanced" passHref>
          <ListItemLevel2>Advanced Example</ListItemLevel2>
        </Link>

        <Divider />

        <ListItemHeader>Default Features</ListItemHeader>
        <Link href="/docs/guides/column-actions" passHref>
          <ListItemLevel2>Column Actions</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/column-visibility" passHref>
          <ListItemLevel2>Column Hiding</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/dense-padding" passHref>
          <ListItemLevel2>Dense Padding Toggle</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/filtering" passHref>
          <ListItemLevel2>Filtering</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/full-screen" passHref>
          <ListItemLevel2>Full Screen Toggle</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/pagination" passHref>
          <ListItemLevel2>Pagination</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/search" passHref>
          <ListItemLevel2>Search (Global Filtering)</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/sorting" passHref>
          <ListItemLevel2>Sorting</ListItemLevel2>
        </Link>

        <ListItemHeader>More Features</ListItemHeader>
        <Link href="/docs/guides/custom-css" passHref>
          <ListItemLevel2>Customize CSS</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/custom-icons" passHref>
          <ListItemLevel2>Customize Icons</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/custom-toolbars" passHref>
          <ListItemLevel2>Customize Toolbars</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/column-grouping" passHref>
          <ListItemLevel2>Column Grouping</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/column-resizing" passHref>
          <ListItemLevel2>Column Resizing</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/detail-panel" passHref>
          <ListItemLevel2>Detail Panel (Expanding)</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/localization" passHref>
          <ListItemLevel2>Localization  (i18n)</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/row-actions" passHref>
          <ListItemLevel2>Row Actions</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/row-editing" passHref>
          <ListItemLevel2>Row (Data) Editing</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/row-numbers" passHref>
          <ListItemLevel2>Row Numbers</ListItemLevel2>
        </Link>
        <Link href="/docs/guides/row-selection" passHref>
          <ListItemLevel2>Row Selection</ListItemLevel2>
        </Link>
      </StyledList>
    </Drawer>
  );
};

export default SideBar;
