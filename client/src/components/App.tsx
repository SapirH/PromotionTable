import axios from 'axios';
import config from 'config';
import { Button } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';

import Table from './Table';
import { Promotion } from 'types/promotion';

import useStyles from './AppStyles';

const App: FC = (): JSX.Element => {
    const classes = useStyles();
	const [promotions, setPromotions] = useState<Promotion[]>([]);

    const getPromotions = async () => {
        const { data } = await axios.get(`${config.baseURL}/page/0`);
        setPromotions(data);
    } 

    const createMockPromotions = async () => {
        const { data } = await axios.post(`${config.baseURL}/mock`);
        setPromotions([...promotions , ...data]);
    } 

    useEffect(() => {
		getPromotions();
	},[]);

    return (
        <div className={classes.container}>
            <div className={classes.title}> MoonActive Promotions screen </div>
            <Table data={promotions} setData={setPromotions}/>
            <Button className={classes.btn} variant='contained' onClick={createMockPromotions}>Create Mock</Button>
        </div>
    );
}

export default App;