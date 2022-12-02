import { render, screen,fireEvent,waitFor } from "@testing-library/react";
import Details from "views/NFT/components/Details";
import {collections} from 'mocks/collections';
import axios from 'axios';

jest.mock('axios');
window.scrollTo = jest.fn()

beforeEach(()=>{
    render(<Details />)
});

describe('When component is mountend', ()=>{
    test('there must be a title form page',async ()=>{
        axios.get.mockReturnValueOnce({
            data:collections[0]
        });
        waitFor(async()=>{
            const btnScan = await screen.findAllByRole("Box",{name:'<span>nft_details.etherscan</span>'});
            fireEvent.click(btnScan)
            expect(btnScan).toBeInTheDocument();
            const btnMetadata = await screen.findAllByRole("Box",{name:'<span>nft_details.metadata</span>'});
            fireEvent.click(btnMetadata)
            expect(btnMetadata).toBeInTheDocument();
            const btnIpfs = await screen.findAllByRole("Box",{name:'<span>nft_details.ipfs</span>'});
            fireEvent.click(btnIpfs)
            expect(btnIpfs).toBeInTheDocument();
        })
    });
});