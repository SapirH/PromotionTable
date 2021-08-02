import { FC } from 'react';
import { TableRow, TableCell } from '@material-ui/core';

import { Column } from 'types/TableItem';

const TableColumns: FC<Props> = ({ classes, columns }: Props): JSX.Element => (
	<TableRow className={classes.row}>
		<TableCell key={'select'} className={`${classes.cell} ${classes.title} ${classes.checkbox}`}/>
		{ columns.map((column: any, colIndex: number) => (
			<TableCell key={`${column.label}-${colIndex}`} className={`${classes.cell} ${classes.title}`}>
				{column.label}
			</TableCell>
		))}
		<TableCell key={'Actions'} className={`${classes.cell} ${classes.title}`}> Actions </TableCell>
	</TableRow>
);

interface Props {
	classes: any,
  	columns: Column[],
}

export default TableColumns;