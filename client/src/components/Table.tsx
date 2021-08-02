import axios from 'axios';
import config from 'config';
import Swal from 'sweetalert2';
import memoizeOne from 'memoize-one';
import { FC, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { Table, TableBody, TableHead } from '@material-ui/core';

import Row from './Row';
import TableColumns from './Columns';
import { TableItem, Column } from 'types/TableItem';
import { Promotion, PromotionKeys } from 'types/promotion';

import useStyles from './TableStyles';

const itemKey = (index: number, data: TableItem) => data.items[index]._id;
const createColumn = (columnName: string) => ({ name: columnName, label: columnName });
const createItemData = memoizeOne((classes: Object, columns: Column[], items: Promotion[]) => ({ columns, classes, items }));

const PromotionsTable: FC<Props> = ({ data, setData }: Props): JSX.Element => {
	const classes = useStyles();    
    const [selectedIndexs, setSelectedIndexs] = useState<number[]>([]);
    const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
	
	const itemCount: number = data.length + 1;
	const columns: Column[] = PromotionKeys.map(createColumn);
	const itemData: TableItem = createItemData(classes, columns, data);

	const selectPromotion = (index: number) => {
		let updatedSelectesIndexs
		if (selectedIndexs.includes(index)) {
            updatedSelectesIndexs = selectedIndexs.filter((selectedIndex: number) => selectedIndex !== index);
		} else{
			updatedSelectesIndexs=[...selectedIndexs, index]
		}
		setSelectedIndexs(updatedSelectesIndexs);
    } 

    const deletePromotion = async (itemId: string) => {
        const { isConfirmed } = await Swal.fire({
                title: 'Do you want to delete the promotion?',
                icon: 'warning',
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancle',
                showCancelButton: true,
                confirmButtonColor: 'blue',
                cancelButtonColor: 'gray',
				customClass: {
					title: classes.swal,
					container: classes.swal,
					confirmButton: classes.swal,
				},
            })
        if (isConfirmed){
            await axios.delete(`${config.baseURL}/${itemId}`);
            const updatedPromotions = data.filter((item: Promotion) => item._id !== itemId);
            console.log(updatedPromotions);
            setData(updatedPromotions);
        }
    }

    const duplicatePromotion = async (promotion: Promotion) => {
        const { data: { insertedId } } = await axios.post(`${config.baseURL}/duplicate`, { promotion });
		console.log(insertedId)
        setData([...data, { ...promotion, _id: insertedId }])
    }

    const updatePromotion = async (updatedPromotion: Promotion) => {
		const updatedData: Promotion[] = [...data];
        await axios.put(`${config.baseURL}/${updatedPromotion._id}`, { updatedPromotion });
		const index = data.findIndex((item: Promotion) => item._id === updatedPromotion._id);
		updatedData[index] = updatedPromotion;
		setData(updatedData);
    }
	
	const loadNextPage = (startIndex: number, stopIndex: number) => {
		const rangeStart = stopIndex;
		return new Promise((resolve: any) =>
			setTimeout(async() => {
				const res = await axios.get(`${config.baseURL}/page/${rangeStart}`);
				setData([...data, ...res.data]);
				setIsNextPageLoading(false);
				resolve();
			}, 500)
		);
	}

	const isItemLoaded = (index: number) => index < data.length;
	const loadMoreItems = isNextPageLoading ? () => null: loadNextPage;
	
	return (
		<Table className={classes.tableContainer}>
			<TableHead className={classes.tableHead}>
				<TableColumns classes={classes} columns={columns} />
			</TableHead>
			<TableBody className={classes.tableBody}>
				<InfiniteLoader
					isItemLoaded={isItemLoaded}
					itemCount={itemCount}
					loadMoreItems={loadMoreItems}
				>      
					{({ onItemsRendered, ref }) => (
						<AutoSizer>
							{({ height, width }: any) => (
								<List
									height={height}
									width={width}
									itemCount={data.length}
									itemSize={50}          
									onItemsRendered={onItemsRendered}
									ref={ref}
									itemKey={itemKey}
									itemData={itemData}
								>
									{(props) => Row({...props, isSelected: selectedIndexs.includes(props.index),selectPromotion, deletePromotion, duplicatePromotion, updatePromotion })}
								</List>
							)}
						</AutoSizer>
					)}
				</InfiniteLoader>
			</TableBody>
		</Table>
	)
};
interface Props {
	data: Promotion[],
	setData: Function,
}
export default PromotionsTable;