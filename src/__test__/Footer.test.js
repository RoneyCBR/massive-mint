import { render ,screen,fireEvent} from "@testing-library/react";
import Footer from '../layouts/Main/Footer'
import axios from 'axios';
import WalletProvider from 'hooks/WalletContext';
import {I18nextProvider} from 'react-i18next';
import i18n from '../i18n';
jest.mock('axios');

describe('Footer component is mounted', () => {
    test('Rendering Footer  exist iconsSocial and textLinks',async() => {
        render(
            <I18nextProvider i18n={i18n}>
                <WalletProvider> 
                    <Footer />
                </WalletProvider> 
            </I18nextProvider>
        )
        const text2022 = screen.getByText(/© 2022. All rights reserved/i);
        let socialIcons ;
        let textLink;
        axios.get.mockReturnValueOnce({
            data:{
                socialIcons:
                [
                    {facebook:'url1'},
                    {instagram:'url2'},
                    {twitter:'url3'}
                ],
                textLink:[
                    {text:'text',link:'url'},
                    {text:'text',link:'url'},
                    {text:'text',link:'url'},
                    {text:'text',link:'url'}
                ]
            }
        });

        expect(text2022).toBeInTheDocument();
        socialIcons = await screen.findAllByRole('img');
        socialIcons.forEach(async (icon)=>{
            expect(await screen.findByRole(icon)).toBeInTheDocument();
        })
        textLink = await screen.findAllByRole('link');
        textLink.forEach(async (text)=>{
            expect(await screen.findByRole(text,{href:'url'})).toBeInTheDocument();
        })
       
    });
});

describe('click to links icons and text', () => {
    test('event click socialIcons and textLinks',async() => {
        render(
            <I18nextProvider i18n={i18n}>
                <WalletProvider> 
                    <Footer />
                </WalletProvider> 
            </I18nextProvider>
        )
        const text2022 = screen.getByText(/© 2022. All rights reserved/i);
        let socialIcons ;
        let textLink;
        axios.get.mockReturnValueOnce({
            data:{
                socialIcons:
                [
                    {facebook:'url1'},
                    {instagram:'url2'},
                    {twitter:'url3'}
                ],
                textLink:[
                    {text:'text',link:'url'},
                    {text:'text',link:'url'},
                    {text:'text',link:'url'},
                    {text:'text',link:'url'}
                ]
            }
        });

        expect(text2022).toBeInTheDocument();
        socialIcons = await screen.findAllByRole('img');
        socialIcons.forEach(async (icon)=>{
            fireEvent.click(icon)
            expect(await screen.findByRole(icon)).toBeInTheDocument();
        })
        textLink = await screen.findAllByRole('link');
        textLink.forEach(async (text)=>{
            fireEvent.click(text)
            expect(await screen.findByRole(text,{href:'url'})).toBeInTheDocument();
        })
       
    });
});
