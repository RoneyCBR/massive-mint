import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import Wrapper from "views/EditCollection/EditPrice/Wrapper";
import WalletProvider from 'hooks/WalletContext';
import {I18nextProvider} from 'react-i18next';
import i18n from '../i18n';

beforeEach(()=>{
    render(
        <I18nextProvider i18n={i18n}>
            <WalletProvider> 
            <Wrapper />
            </WalletProvider> 
        </I18nextProvider>
    );
})

//mock sign async function
jest.mock('services/Utils/signature', () => ({
    sign: jest.fn().mockImplementation(() => Promise.resolve('signed'))
}));
describe('when component is mounted', () => {
    test("check title", () => {
        expect(screen.getByText(/Update Price/i)).toBeInTheDocument();
    });
});