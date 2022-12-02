import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import cards from 'utils/cardName';
import PropTypes from 'prop-types';

const SortCard = ({ query, history, setUrl, rootUrlFilters, page, setPage, setCards, rootUrlRandom }) => {
    const { t } = useTranslation("translate");
    const selectRef = useRef(null);
    const handleChangeSelect = () => {
        setPage(0);
        setCards([]);
        const value = selectRef.current?.value;
        if (value == 'all' || value == '') {
            query.card = '';
            const params = `${query.slug}${query.author}${query.card}${query.type}`;
            setUrl(`${rootUrlRandom}&limit=100&page=${page}&order=random`);
            history.push(`${location.pathname}?${params}`);
            return;
        }
        query.card = `&key_name=name&key_val=${value}`;
        query.slug = '';
        const params = `${query.slug}${query.author}${query.card}${query.type}`;
        setUrl(`${rootUrlFilters}&limit=100&page=${page}${query.order}${params}`);
        history.push(`${location.pathname}?${params}`);
    };
    
    return (
        <Box sx={{ border: '0.5px solid #e3e3e3', borderRadius: '8px', padding: '4px 10px' }}>
            <select ref={selectRef} style={{ border: 'none', outline: 'none' }} onChange={handleChangeSelect}>
                <option value="all">{t("search.all_cards")}</option>
                    {cards.sort((a,b) => {
                        if ( a.name < b.name ) {
                            return -1;
                        }
                        if ( a.name > b.name ) {
                            return 1;
                        }
                        return 0;
                    }).map((card, index)=>(
                        <option key={index} value={card.name}>{card.name}</option>
                    ))}
            </select>
        </Box>
    );
};

SortCard.propTypes = {
    query: PropTypes.object,
    history: PropTypes.object,
    setCards: PropTypes.func,
    rootUrlFilters: PropTypes.string,
    page: PropTypes.number,
    setPage: PropTypes.func,
    setUrl: PropTypes.func,
    rootUrlRandom: PropTypes.string
};

export default SortCard;