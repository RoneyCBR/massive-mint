import { render, screen,waitFor } from "@testing-library/react";
import Collection from "views/Collection";
import WalletProvider from 'hooks/WalletContext';
import {collections} from 'mocks/collections';
import {I18nextProvider} from 'react-i18next';
import i18n from '../i18n';
import axios from 'axios';

jest.mock('axios');
window.scrollTo = jest.fn()

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
    useLocation: () => ({
        pathname: "/"
    })
}));



beforeEach(()=>{
    render(
        <I18nextProvider i18n={i18n}>
            <WalletProvider> 
                <Collection/>
            </WalletProvider> 
        </I18nextProvider>
    )
});


describe('When component is mountend', ()=>{

    test('exist img and button', ()=>{
        axios.get.mockReturnValueOnce({
            data:collections[0]
        });
        waitFor(async()=>{
            expect(await screen.findAllByRole("button")).toBeInTheDocument();
            expect(await screen.findAllByRole("img")).toBeInTheDocument();
        });
    });
});

describe('When component is mountend', ()=>{

    test('exist menu ', ()=>{
        axios.get.mockReturnValueOnce({
            data:collections[0]
        });
        waitFor(async()=>{
            expect(await screen.findByText("collection.nft_tab")).toBeInTheDocument();
            expect(await screen.findByText("collection.description_tab")).toBeInTheDocument();
            expect(await screen.findByText("collection.activity_tab")).toBeInTheDocument();
        });
    });
});