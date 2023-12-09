import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import GlobalHeader from './components/GlobalHeader';
import Home from './pages/Home';
import Topics from './pages/Topics';
import Counter from './pages/Counter';
import Posts from './pages/Posts';
import Users from './pages/Users';
import { ReactComponent as Star } from './assets/react.svg';
import RateControl from './pages/RateControl';
import NotMatch from './components/NoMatch';
import './App.css';

const { Content, Footer } = Layout;

export type AppIProps = {
    appName?: string;
};

const logoStyle: React.CSSProperties = {
    width: '200px'
};

const App: React.FC = () => {
    return (
        <Router>
            <Layout className="layout">
                <GlobalHeader />
                <Content>
                    <div
                        style={{
                            margin: 24,
                            padding: 24,
                            background: '#fff',
                            minHeight: `calc(100vh - 8rem)`
                        }}
                    >
                        <section className="App">
                            <Star className="App-logo" style={logoStyle} />
                        </section>
                        <section>
                            <div className="bg">div element with background</div>
                        </section>
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/topics">
                                <Topics />
                            </Route>
                            <Route path="/posts">
                                <Posts />
                            </Route>
                            <Route path="/users">
                                <Users />
                            </Route>
                            <Route path="/counter">
                                <Counter />
                            </Route>
                            <Route path="/rateControl">
                                <RateControl />
                            </Route>
                            <Route path="*" render={props => <NotMatch {...props} />} />
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Footer Content &copy;2021</Footer>
            </Layout>
        </Router>
    );
};

export default App;
