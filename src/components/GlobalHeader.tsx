import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, MenuTheme } from 'antd';

const { Header } = Layout;

const routes = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Topics',
        path: '/topics'
    },
    {
        name: 'Counter',
        path: '/counter'
    },
    {
        name: 'Posts',
        path: '/posts'
    },
    {
        name: 'Users',
        path: '/users'
    },
    {
        name: 'RateControl',
        path: '/rateControl'
    }
];

export interface IGlobalHeaderProps {
    theme?: MenuTheme;
}

function GlobalHeader(props: IGlobalHeaderProps) {
    const { theme = 'dark' } = props;
    const { pathname } = useLocation();

    const items = useMemo(
        () =>
            routes.map(route => {
                return {
                    key: route.path,
                    // label: route.name,
                    label: <Link to={route.path}>{route.name}</Link>
                };
            }),
        []
    );

    return (
        <Header>
            <div className="logo" />
            <Menu mode="horizontal" theme={theme} items={items} selectedKeys={[pathname]} />
        </Header>
    );
}

export default GlobalHeader;
