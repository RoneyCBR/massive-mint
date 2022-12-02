import { render, screen ,waitFor} from "@testing-library/react";
import EditCollection from "views/EditCollection";
import { BrowserRouter as Router } from 'react-router-dom';
import i18n from "i18n";
import { I18nextProvider } from "react-i18next";
import userEvent from '@testing-library/user-event'
import {collections} from 'mocks/collections';
import axios from 'axios';

jest.mock('axios');
beforeEach(() => {
    render(
        <I18nextProvider i18n={i18n}>
            <Router>
                <EditCollection />
            </Router>
        </I18nextProvider>
    );
});

describe('check if component is mounted', () => {
    test("check title", () => {
        waitFor(async()=>{
            expect(await screen.findAllByRole('button', {name:'create_collection.cancel_btn'})).toBeInTheDocument();
        });
       
    });
});

describe ('When the form is mounted', ()=>{
    test('there must be create edit collection form page.', ()=>{
        waitFor(async()=>{
            expect(await screen.findAllByRole('heading', {name:'edit_collection.title'})).toBeInTheDocument();
        });
    });
    test('should exists the fields:  image, name, description, submit and cancel button', ()=>{
        axios.get.mockReturnValueOnce({
            data:collections[0]
        });
        waitFor(async()=>{
            expect(await screen.findByRole('heading',{name:'create_collection.upload_image'})).toBeInTheDocument();
            expect(await screen.findByRole('heading',{name:'create_collection.upload_banner'})).toBeInTheDocument();
            expect(await screen.findByRole(/create_collection.collection_name/i)).toBeInTheDocument();
            expect(await screen.findByRole(/create_collection.description/i)).toBeInTheDocument();
            expect(await screen.findByRole(/edit_collection.btn_update/i)).toBeInTheDocument();
            expect(await screen.findByRole(/create_collection.cancel_btn/i)).toBeInTheDocument();
        });
       
    })
})

describe('Should submiting the form', ()=>{
    test('', async()=>{
        const handleSubmit = jest.fn();
        const collection = userEvent.setup()
        waitFor(async()=>{
            await collection.type(await screen.findByRole(/create_collection.collection_name/i), 'John');
            await collection.type(await screen.findByRole(/create_collection.description/i), 'test!');
            await collection.click(screen.queryByRole('form', {name: /edit/i, onSubmit: handleSubmit}));
        });
    
    });
});
