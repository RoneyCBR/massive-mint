import { render, screen } from "@testing-library/react";
import Home from "views/Home";
import WalletProvider from 'hooks/WalletContext';
import {I18nextProvider} from 'react-i18next';
import i18n from '../i18n';
import { collections } from "mocks/collections";
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
    render(
        <I18nextProvider i18n={i18n}>
            <WalletProvider> 
                <Home />
            </WalletProvider> 
        </I18nextProvider>
    )
});


describe('When component is mountend', ()=>{
    let load;
    beforeEach(() => {
        
        load = true;
    });
    afterEach(() => {
        load = false;
        axios.get.mockReturnValueOnce({
            data:collections
        });
    });

    it('init loading', async() => {
        if(!load){
            expect(await screen.findAllByRole("button")).toBeInTheDocument();
        }
    });

   
});
