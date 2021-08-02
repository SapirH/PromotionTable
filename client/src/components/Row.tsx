import { get } from 'lodash';
import { FC, useState, ChangeEvent } from 'react';
import { TableRow, TableCell, IconButton, Checkbox, Tooltip, TextField } from '@material-ui/core';
import { EditOutlined, DeleteOutlineOutlined, LibraryAddOutlined, CheckOutlined } from '@material-ui/icons';

import { Promotion } from 'types/promotion';
import { Column } from 'types/TableItem';

const Row: FC<Props> = ({ index, style, data: { columns, items, classes }, isSelected, selectPromotion, deletePromotion, duplicatePromotion, updatePromotion }: Props): JSX.Element => {
    const item = items[index];
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [updatedItem, setUpdatedItem] = useState<Promotion>(item);

    const updateColumn = (value: string, columnName: string) => {
        setUpdatedItem({ ...updatedItem, [columnName]: value});
    }
    const saveColumn = () => {
        updatePromotion(updatedItem);
        setIsEditMode(false);
    }

	return (
        <TableRow className={classes.row} style={style}>
            <TableCell key={item._id + 'select'} className={`${classes.cell} ${classes.checkbox}`}>
                <Checkbox color='default' className={classes.icon} checked={isSelected} onChange={() =>{ selectPromotion(index) }}/>                
            </TableCell>
            { columns.map((column: Column, colIndex: number) => (
                <Tooltip key={item._id + colIndex + 'tooltip'} title={item[column.name]}>
                    <TableCell key={item._id + colIndex} className={classes.cell}>
                        <TextField disabled={!isEditMode} value={get(updatedItem, column.name)} onChange={(e: ChangeEvent<HTMLInputElement>) => updateColumn(e.target.value, column.name)}/>
                    </TableCell>
                </Tooltip>
            ))}
            <TableCell key={item._id + 'actions'} className={classes.cell}>
                <IconButton key={item._id + 'edit'} className={classes.icon}>
                    {isEditMode ? <CheckOutlined onClick={saveColumn}/> : <EditOutlined onClick={() => { setIsEditMode(!isEditMode) }}/>}
                </IconButton>
                <IconButton key={item._id + 'duplicate'} className={classes.icon} onClick={() => duplicatePromotion(item)}>
                    <LibraryAddOutlined/>
                </IconButton>
                <IconButton key={item._id + 'delete'} className={classes.icon} onClick={() => deletePromotion(item._id)}>
                    <DeleteOutlineOutlined/>
                </IconButton>
            </TableCell>
        </TableRow>
	);
};

interface Props {
	index: number, 
    style: any, 
    data: any,
    isSelected: boolean,
    selectPromotion: Function,
    deletePromotion: Function,
    duplicatePromotion: Function,
    updatePromotion: Function
};

export default Row;