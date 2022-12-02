import { screen } from "@testing-library/dom";
import { render ,fireEvent ,waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import UpdatePriceCollection from "views/EditCollection/EditPrice/UpdatePriceCollection";
import Wrapper from "views/EditCollection/EditPrice/Wrapper";
import StatusTxContext from 'hooks/StatusTxContext';
import WalletProvider from 'hooks/WalletContext';
import {I18nextProvider} from 'react-i18next';
import i18n from '../i18n';

beforeEach(()=>{
    render(
        <I18nextProvider i18n={i18n}>
            <WalletProvider> 
                <StatusTxContext>
                    <Wrapper>
                        <UpdatePriceCollection />
                    </Wrapper>
                </StatusTxContext>
            </WalletProvider>
        </I18nextProvider>
    );
})

//mock sign async function
jest.mock('services/Utils/signature', () => ({
    sign: jest.fn().mockImplementation(() => Promise.resolve('signed'))
}));


describe('valid if exist form', () => {
    test("check form", () => {
        expect(screen.getByPlaceholderText(/New price/i)).toBeInTheDocument();
        expect(screen.getByRole('button',{name:/Update Price/i})).toBeInTheDocument();
    });
});

describe('when the user submits the form without values', ()=>{
    test('should display a validation error message for the input name', async()=>{
        expect(screen.queryByText(/This field is required/i)).toBeNull();
        fireEvent.blur(screen.getByPlaceholderText(/New price/i));
        waitFor(async()=>{
            expect(await screen.findByText(/This field is required/i)).toBeInTheDocument();
        });
    });
});

describe('In case of submitting the form', ()=>{
    test('submit', async()=>{
        const handleSubmit = jest.fn();
        const collection = userEvent.setup()
        await collection.type(screen.getByPlaceholderText(/New price/i), '1');
        await collection.click(screen.queryByRole('form', {name: /Update Price/i, onSubmit: handleSubmit}));
    });
});