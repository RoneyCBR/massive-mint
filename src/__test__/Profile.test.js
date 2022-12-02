import { render, screen,waitFor} from "@testing-library/react";
import Profile from "views/Profile";
import DrawerMobileProvider from 'hooks/DrawerMobileContext';
import WalletProvider from 'hooks/WalletContext';
import i18n from '../i18n';
import { I18nextProvider } from "react-i18next";
import {account} from 'mocks/account';

const mockHistoryPush = jest.fn();
const setUrlNFTs = jest.fn();
const setOpenModal = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
    useLocation: () => ({
        pathname: "/"
    })
}));


beforeEach(() => {
    render(
        <I18nextProvider i18n={i18n}>
            <DrawerMobileProvider>
                <WalletProvider> 
                    <Profile />   
                </WalletProvider> 
            </DrawerMobileProvider>
        </I18nextProvider>
    )
});



describe('When component is mountend', async()=>{

    let load;
    setUrlNFTs('')
    beforeEach(() => {
        load = true;
    });
    afterEach(() => {
        load = false
    });
    it('init loading', () => {
        const projectOwner = jest.fn().mockResolvedValueOnce(load);
        const formEditProfile = jest.fn().mockResolvedValueOnce(account);
        if(!projectOwner && formEditProfile){
            waitFor(async()=>{
                expect(await screen.findByText(/profile.message_load.loading_profile/i)).toBeInTheDocument();
                expect(await screen.findByText(/profile.message_load.loading_profile/i)).not.toBeInTheDocument(); 
                expect(projectOwner).toBeCalledTimes(1);
                expect(formEditProfile).toBeCalledTimes(1);
            });
        }
      
    });

    it('show profile', () => {
        const projectOwner = jest.fn().mockResolvedValueOnce(load);
        const formEditProfile = jest.fn().mockResolvedValueOnce(account);
        if(!projectOwner && formEditProfile){
            waitFor(async()=>{
                expect(await findByText('NFTs')).toBeInTheDocument();
                expect(await findByText('profile.tab_collections_created')).toBeInTheDocument();
                expect(await findByText('profile.tabs.activity')).toBeInTheDocument();
                expect(projectOwner).toBeCalledTimes(1);
                expect(formEditProfile).toBeCalledTimes(1);
            });
        }
      
    });

    it('modal edit profile', () => {
        const formEditProfile = jest.fn().mockResolvedValueOnce(account);
        setOpenModal(true);
        if(formEditProfile){
            waitFor(async()=>{
                expect(screen.getByText('profile.modal_edit.title')).toBeInTheDocument();
                expect(await screen.findByRole('textbox',{name:'profile.modal_edit.username'})).toBeInTheDocument();
                expect(await screen.findByRole('textbox',{name:'profile.modal_edit.email'})).toBeInTheDocument();
                expect(await screen.findByRole('textbox',{name:'instragram'})).toBeInTheDocument();
                expect(await screen.findByRole('textbox',{name:'twitter'})).toBeInTheDocument();
                expect(await screen.findByRole('textbox',{name:'profile.modal_edit.description'})).toBeInTheDocument();
                expect(await screen.findByRole('button',{name:'profile.modal_edit.save_btn'})).toBeInTheDocument();
                expect(formEditProfile).toBeCalledTimes(1);
            });
        }
      
    });
});

