import { render, screen ,waitFor,fireEvent} from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import i18n from "i18n";
import { I18nextProvider } from "react-i18next";
import PreMintMassive from "views/PreMintMassive";
import {collections} from 'mocks/collections';
import axios from 'axios';

jest.mock('axios');
window.scrollTo = jest.fn();

beforeEach(() => {
    render(
        <I18nextProvider i18n={i18n}>
            <Router>
                <PreMintMassive />
            </Router>
        </I18nextProvider>
    );
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('check if component is mounted', () => {
    test("loading collection", async() => {
        axios.get.mockReturnValueOnce({
            data:collections[0]
        });
        waitFor(async()=>{
            expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
            expect(await screen.findByText(/Loading.../i)).not.toBeInTheDocument();
        });

    });

    test("show form",() => {
        axios.get.mockReturnValueOnce({
            data:collections[0]
        });
        waitFor(async()=>{
            expect(await screen.findByText(/pre_mint_nft_massive.collection_selected/i)).toBeInTheDocument();
            expect(await screen.findByText(/pre_mint_nft_massive.type_panel.with_content/i)).toBeInTheDocument();
            expect(await screen.findByText(/pre_mint_nft_massive.type_panel.without_content/i)).toBeInTheDocument();
            expect(await screen.findByText(/MIN/i)).toBeInTheDocument();
            expect(await screen.findByText(/MAX/i)).toBeInTheDocument();
            expect(await screen.findByText(/pre_mint_nft_massive.preview.view_btn/i)).toBeInTheDocument();
        });

    });

});

describe('when component is mount and is not owner',()=>{
    let isOwner = false;
    beforeEach(() => {
        isOwner = false;
    });
    afterEach(() => {
        isOwner = false
    });
    it('Show text you don´t own this collections', () => {
        const projectOwner = jest.fn().mockResolvedValueOnce(isOwner);
        if(!projectOwner){
            waitFor(async()=>{
                expect(await screen.findByRole("heading",{name:/pre_mint_nft_massive.message.you_dont_owner/i})).toBeInTheDocument();   
                expect(projectOwner).toBeCalledTimes(1);
            });
        }
      
    });
})

describe('when component is mount and is owner', () => {
    let isOwner;
    beforeEach(() => {
        isOwner = false;
    });
    afterEach(() => {
        isOwner = false
    });

    it('show checkbox by confirm sharing', () => {
        isOwner = true;
        const projectOwner = jest.fn().mockResolvedValueOnce(isOwner);
        if(projectOwner){
            waitFor(async()=>{
                expect(await screen.findByRole("checkbox",{name:/pre_mint_nft_massive.confirm_step_1/i})).not.toBeInTheDocument();
                expect(await screen.findByRole("checkbox",{name:/pre_mint_nft_massive.confirm_step_1/i})).toBeInTheDocument();   
                expect(projectOwner).toBeCalledTimes(1);
            });
        } 
      
    });

    it('show inputs urls', () => {
        isOwner = true;
        const projectOwner = jest.fn().mockResolvedValueOnce(isOwner);
        if(projectOwner){
            waitFor(async()=>{
                let confirmSharing = screen.getByRole("checkbox",{name:/pre_mint_nft_massive.confirm_step_1/i}).toBeInTheDocument()
                fireEvent.click(confirmSharing);
                expect(screen.getByPlaceholderText(/pre_mint_nft_massive.sheet_file_url/i)).toBeInTheDocument();   
                expect(screen.getByPlaceholderText(/pre_mint_nft_massive.folder_url/i)).toBeInTheDocument(); 
                expect(projectOwner).toBeCalledTimes(1);
                expect(confirmSharing).toBeCalledTimes(1);
                let urlFile = screen.getByPlaceholderText(/pre_mint_nft_massive.sheet_file_url/i);
                let urlFolder = screen.getByPlaceholderText(/pre_mint_nft_massive.folder_url/i);
                const handleSubmit = jest.fn();
                const massiveMint = userEvent.setup();
                await massiveMint.type(urlFile, 'https://url.com/file=edit');
                await massiveMint.type(urlFolder, 'https://folder.com/folder');
                await massiveMint.click(screen.queryByRole('form', {name: /Preview/i, onSubmit: handleSubmit}));
            });

            waitFor(async()=>{
                expect(await screen.findAllByRole("img")).toBeInTheDocument();
            });
        } 
      
    });

  });