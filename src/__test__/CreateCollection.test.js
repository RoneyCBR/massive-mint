import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateCollection from "views/CreateCollection";
import userEvent from '@testing-library/user-event'

beforeEach(()=>{
    render(<CreateCollection />);
})

describe ('When the form is mounted', ()=>{
    test('there must be create collection form page.', ()=>{
        expect(
            screen.getByRole('heading', {name: /create_collection.title/i}),
          ).toBeInTheDocument()
    });
    test('should exists the fields:  image, name, description, submit and cancel button', ()=>{
        expect(screen.getByRole('heading',{name:'create_collection.upload_image'})).toBeInTheDocument();
        expect(screen.getByRole('heading',{name:'create_collection.upload_banner'})).toBeInTheDocument();
        expect(screen.getByLabelText(/create_collection.collection_name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/create_collection.description/i)).toBeInTheDocument();
    })
    test('should exists submit button', ()=>{
        expect(screen.getByRole('button', {name: /create_collection.create_btn/i})).toBeInTheDocument();
    })
    test('should exists cancel button', ()=>{
        expect(screen.getByRole('button', {name: /create_collection.cancel_btn/i})).toBeInTheDocument();
    })
})

describe('when the user submits the form without values', ()=>{
    test('should display a validation error message for the input name', async()=>{
        expect(screen.queryByText(/name is required/i)).toBeNull();
        fireEvent.blur(screen.getByLabelText(/create_collection.collection_name/i));
        let error;
        await waitFor(() => {
          error = screen.getByText(/Name is required/i);
        });

        expect(error).toBeInTheDocument();
    });
    test('should display a validation error message for the input description', async()=>{
        expect(screen.queryByText(/Description is required/i)).toBeNull();
        fireEvent.blur(screen.getByLabelText(/create_collection.description/i));
        let error;
        await waitFor(() => {
          error = screen.getByText(/Description is required/i);
        });

        expect(error).toBeInTheDocument();
    });
});

describe('Should submiting the form', ()=>{
    test('', async()=>{
        const handleSubmit = jest.fn();
        const collection = userEvent.setup()
        await collection.type(screen.getByLabelText(/create_collection.collection_name/i), 'John');
        await collection.type(screen.getByLabelText(/create_collection.description/i), 'test!');
        await collection.click(screen.queryByRole('form', {name: /create/i, onSubmit: handleSubmit}));
    });
});