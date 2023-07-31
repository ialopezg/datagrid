export const showOverrideWarnings = (props: any) => {
  if (props.CustomBodyComponent) {
    showWarning('TableBody', 'tableBodyProps');
  }
  if (props.CustomBodyCellComponent) {
    showWarning('TableCell', 'props');
  }
  if (props.CustomBodyRowComponent) {
    showWarning('TableRow', 'props');
  }
  if (props.CustomDetailPanelComponent) {
    showWarning('Detail Panel', 'tableDetailPanelProps');
  }
  if (props.CustomFooterComponent) {
    showWarning('TableFooter', 'tableFooterProps');
  }
  if (props.CustomFooterCellComponent) {
    showWarning('TableCell', 'props');
  }
  if (props.CustomFooterRowComponent) {
    showWarning('TableRow', 'props');
  }
  if (props.CustomHeaderComponent) {
    showWarning('TableHead', 'tableHeadProps');
  }
  if (props.CustomHeaderCellComponent) {
    showWarning('TableCell', 'props');
  }
  if (props.CustomHeaderRowComponent) {
    showWarning('TableRow', 'props');
  }
  if (props.CustomPaginationComponent) {
    showWarning('', 'props');
  }
  if (props.CustomToolbarComponent) {
    showWarning('TableBodyCell', 'props');
  }
};

const showWarning = (componentName: string, propsName: string) => {
  console.warn(
    `Caution.\nYou are overriding the built-in Mui ${componentName} Component in DataGrid.\n\nYou should only use this as a last resort!\n\nConsider customizing the Mui ${componentName} Component instead with ${propsName}.`,
  );
};
