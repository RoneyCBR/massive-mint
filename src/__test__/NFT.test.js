import { render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import NFT from "views/NFT";
import { BrowserRouter as Router } from 'react-router-dom';
import i18n from "i18n";
import { I18nextProvider } from "react-i18next";

window.scrollTo = jest.fn();

beforeEach(()=>{
    render (
        <I18nextProvider i18n={i18n}>
            <Router>
                <NFT />
            </Router>
        </I18nextProvider>
    );
});

describe("when component is mounted", () => {
    jest.mock('services/ERC721/isMinted', () => ({
        isMinted: jest.fn().mockImplementation(() => {
            return Promise.resolve(true);
        })
    }));
    test("check title", () => {
        waitFor(async () => {
            const title = await screen.findByText("?");
            expect(title).toBeInTheDocument();
            await waitForElementToBeRemoved(() => screen.getByText("message_loader.nft_screen.loading"));
        });
    });
    test("check correct image is rendered in the view", () => {
        waitFor(async () => {
            const title = await screen.getByRole("img", { name: "nft_view.title" });
            expect(title).not.toBeInTheDocument();
        });
    });
    test("check button transfer", () => {
        waitFor(async () => {
            const btn = await screen.findByRole("button", { name: "nft-screen.transfer_btn" });
            expect(btn).toBeInTheDocument();
        });
    });
    test("check button settings", () => {
        waitFor(async () => {
            const btn = await screen.findByRole("button", { name: "nft-screen.settings_btn" });
            expect(btn).toBeInTheDocument();
        });
    });
    test("check button offer", () => {
        waitFor(async () => {
            const btn = await screen.findByRole("button", { name: "nft-screen.view_my_offers_btn" });
            expect(btn).toBeInTheDocument();
        });
    });
    test("check button buy", () => {
        waitFor(async () => {
            const btn = await screen.findByRole("button", { name: "nft-screen.buy_btn" });
            expect(btn).toBeInTheDocument();
        });
    });
});
