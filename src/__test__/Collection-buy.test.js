import { render, screen,waitFor } from "@testing-library/react";
import CollectionBuy from "views/CollectionBuy";
import WalletProvider from 'hooks/WalletContext';
import axios from 'axios';
import {collections} from 'mocks/collections';
import {I18nextProvider} from 'react-i18next';
import i18n from '../i18n';

let props = {
    "history": {
        "length": 27,
        "action": "PUSH",
        "location": {
            "pathname": "/collection-buy",
            "search": "?collection=0X3222F9B5EC8A1701ED07E8EBEE2AF73B6D7E244A",
            "hash": "",
            "key": "eqsz0g"
        }
    },
    "location": {
        "pathname": "/collection-buy",
        "search": "?collection=0X3222F9B5EC8A1701ED07E8EBEE2AF73B6D7E244A",
        "hash": "",
        "key": "eqsz0g"
    },
    "match": {
        "path": "/collection-buy",
        "url": "/collection-buy",
        "isExact": true,
        "params": {}
    }
}

jest.mock('axios');

beforeEach(()=>{
    render(
        <I18nextProvider i18n={i18n}>
            <WalletProvider> 
                <CollectionBuy {...props} />
            </WalletProvider> 
        </I18nextProvider>
    )
});


describe('When component exist button connect wallet', ()=>{
    test('exist button conect wallet', async()=>{
        screen.debug();
        waitFor(async()=>{
            expect(await screen.findAllByRole("button",{name:'collection_buy_view.connect_wallet'})).toBeInTheDocument();
        });
    });

});

describe('When component is mountend', ()=>{

    test('exist img and button', ()=>{
        axios.get.mockReturnValueOnce({
            data:collections
        });
        waitFor(async()=>{
            expect(await screen.findAllByRole("button")).toBeInTheDocument();
            expect(await screen.findAllByRole("img")).toBeInTheDocument();
        });
    });
});