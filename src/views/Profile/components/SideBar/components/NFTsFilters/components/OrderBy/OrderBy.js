import React, { useRef } from 'react';
//import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const OrderBy = ({ query, history, setUrl, rootUrlFilters, page, setPage, setCards, rootUrlRandom }) => {
    //const { t } = useTranslation("translate");
    const order = [
        {
            id: 0,
            name: 'Created',
            value: 'created'
        },
        {
            id: 1,
            name: 'News',
            value: 'news'
        },
        {
            id: 2,
            name: 'Random',
            value: 'random'
        }
    ]
    const selectRef = useRef(null);
    const handleChangeSelect = () => {
        setPage(0);
        setCards([]);
        const value = selectRef.current?.value;
        if (value == 'order' || value == '') {
            query.order = '';
            const params = `${query.slug}${query.author}${query.order}${query.type}`;
            setUrl(`${rootUrlRandom}&limit=100&page=${page}&order=random`);
            history.push(`${location.pathname}?${params}`);
            return;
        }
        query.order = `&order=${value}`;
        query.slug = '';
        const params = `${query.slug}${query.author}${query.card}${query.type}`;
        setUrl(`${rootUrlFilters}&limit=100&page=${page}${query.order}${params}`);
        history.push(`${location.pathname}?${params}`);
    };
    
    return (
        <Box sx={{ border: '0.5px solid #e3e3e3', borderRadius: '8px', padding: '4px 10px' }}>
            <select ref={selectRef} style={{ border: 'none', outline: 'none' }} onChange={handleChangeSelect}>
                <option value="order">Order By</option>
                {order.map((card, index)=>(
                    <option key={index} value={card.name}>{card.name}</option>
                ))}
            </select>
        </Box>
    );
};

OrderBy.propTypes = {
    query: PropTypes.object,
    history: PropTypes.object,
    setCards: PropTypes.func,
    rootUrlFilters: PropTypes.string,
    page: PropTypes.number,
    setPage: PropTypes.func,
    setUrl: PropTypes.func,
    rootUrlRandom: PropTypes.string
};

export default OrderBy;