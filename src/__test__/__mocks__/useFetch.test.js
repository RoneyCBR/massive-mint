import { useFetch } from "hooks/useFetch" 
import { renderHook } from "@testing-library/react-hooks"
import { rest } from 'msw' 
import { setupServer } from 'msw/node'

const server = setupServer(
    rest.get('/section',(req, res, ctx)=>{
        const {url} = renderHook(()=>useFetch('/section'))
        if (url) {
            return res(ctx.status(200))
        }
        return res(ctx.status(500))
    })
)

beforeAll(()=>server.listen());
afterAll(()=>server.close());
afterEach(()=>server.resetHandlers());

describe('shoud return data from custom hook', ()=>{
    test('should return loader', async()=>{
        server.use(
            rest.get('/section',(req, res, ctx)=>{
                return res(
                    ctx.status(200),
                    ctx.json({
                        loading: true,
                        error: false,
                        status: 200,
                        data: null
                    })
                )
            }));
        const { result, waitForNextUpdate } = renderHook(()=>useFetch('/section'));
        expect(result.current.loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.loading).toBe(false);
    });
    test('should return data success', async()=>{
        server.use(
            rest.get('/section',(req, res, ctx)=>{
                return res(
                    ctx.status(200),
                    ctx.json({
                        loading: false,
                        error: false,
                        status: 200,
                        data: [
                            {
                                id: 1,
                                name: 'section 1'
                            },
                            {
                                id: 2,
                                name: 'section 2'
                            }
                        ],
                    })
                )
            }));
        const { result, waitForNextUpdate } = renderHook(()=>useFetch('/section'));
        expect(result.current.data).not.toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.data).toBeTruthy();
    });
    test('should return data error', async()=>{
        server.use(
            rest.get('/section',(req, res, ctx)=>{
                return res(
                    ctx.status(500),
                    ctx.json({
                        loading: false,
                        error: 'error',
                        status: 500,
                        data: null,
                    })
                )
            }));
        const { result, waitForNextUpdate } = renderHook(()=>useFetch('/section'));
        expect(result.current.error).not.toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.error).toBeTruthy();
    });
});
    