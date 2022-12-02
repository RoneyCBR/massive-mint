import React, {Suspense, lazy, useContext} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'views/Home'; 
import Main from 'layouts/Main';
import { Context } from 'hooks/WalletContext';
import ContainerNetwork from 'layouts/ContainerNetwork';
import ErrorBoundary from 'components/ErrorBoundary';
import LoaderCircle from 'components/LoaderCircle';
import { useTranslation } from 'react-i18next';
import Create from 'views/Create';
import Profile from 'views/Profile';
import { authorizedAddress } from 'config/authorizedAddress';
import CollectionBuy from 'views/CollectionBuy';
const PreMintMassive = lazy(() => import('views/PreMintMassive'));
const CreateCollection =  lazy(() => import('views/CreateCollection'));
const SelectCollection = lazy(() => import('views/SelectCollection'));
const AdminDashboard = lazy(() => import('views/Admin/AdminDashboard'));
const NFT = lazy(() => import('views/NFT'));
const Collection = lazy(() => import('views/Collection'));
const EditCollection = lazy(() => import('views/EditCollection'));

const Routes = () => {
    const { t } = useTranslation("translate");
    const { data } = useContext(Context);

    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Main>
                <Route exact path="/home">
                    <ContainerNetwork>
                        <Home />
                    </ContainerNetwork>
                </Route>
                <Route exact path="/profile">
                    <ContainerNetwork>
                        <Profile />
                    </ContainerNetwork>
                </Route>
                <Route path="/nft">
                    <ErrorBoundary fallback={<div></div>}>
                        <Suspense fallback={<div></div>}>
                            <ContainerNetwork>
                                <NFT />
                            </ContainerNetwork>
                        </Suspense>
                    </ErrorBoundary>
                </Route>
                <Route path="/collection">
                    <ErrorBoundary fallback={<div></div>}>
                        <Suspense fallback={<div></div>}>
                            <ContainerNetwork>
                                <Collection />
                            </ContainerNetwork>
                        </Suspense>
                    </ErrorBoundary>
                </Route>
                <Route path="/create/edit-collection">
                    {(data && data.userAccount)  ? 
                        <ErrorBoundary fallback={<div></div>}>
                            <Suspense fallback={<div></div>}>
                                <ContainerNetwork>
                                    <EditCollection />
                                </ContainerNetwork>
                            </Suspense>
                        </ErrorBoundary>
                        :
                        <Redirect to="/home" />
                    }
                </Route>
                <Route exact path="/admin">
                    {
                        (data && data.userAccount) && (authorizedAddress.includes(data.userAccount)) &&
                        <ErrorBoundary fallback={<div></div>}>
                            <Suspense fallback={<LoaderCircle text={t("message_loader.route.loading")} />}>
                                <ContainerNetwork>
                                    <AdminDashboard />
                                </ContainerNetwork>
                            </Suspense>
                        </ErrorBoundary>
                    }
                </Route> 
                { data && data.user && data.user.role > 1 && data && data.userAccount ?
                <React.Fragment>
                    <Route exact path="/create/select-collection">
                        <ErrorBoundary fallback={<div></div>}>
                            <Suspense fallback={<LoaderCircle text={t("message_loader.route.loading")} />}>
                                <ContainerNetwork>
                                    <SelectCollection />
                                </ContainerNetwork>
                            </Suspense>
                        </ErrorBoundary>
                    </Route>
                    
                    <Route exact path="/create/create-collection">
                            <ErrorBoundary fallback={<div></div>}>
                                <Suspense fallback={<LoaderCircle text={t("message_loader.route.loading")} />}>
                                    <ContainerNetwork>
                                        <CreateCollection />
                                    </ContainerNetwork>
                                </Suspense>
                            </ErrorBoundary>
                    </Route>  
                    <Route exact path="/create/massive-pre-mint-nft">
                        <ErrorBoundary fallback={<div></div>}>
                            <Suspense fallback={<LoaderCircle text={t("message_loader.route.loading")} />}>
                                <ContainerNetwork>
                                    <PreMintMassive />
                                </ContainerNetwork>
                            </Suspense>
                        </ErrorBoundary>
                    </Route> 
                    <Route exact path="/create">
                        <ContainerNetwork>
                            <Create />
                        </ContainerNetwork>
                    </Route> 
                </React.Fragment>:
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                }
                <Route
                    exact
                    path="/collection-buy"
                    render={(props) => (
                        <ContainerNetwork>
                            <CollectionBuy {...props} />
                        </ContainerNetwork>
                    )}
                />
            </Main>
            <Redirect to="/home" />
        </Switch>
  );
};

export default Routes;
