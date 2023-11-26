import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

function NotMatch(props: RouteComponentProps) {
    const { location } = props;
    return (
        <div>
            <p style={{ paddingBottom: 10 }}>
                No match for <code>{location.pathname}</code>
            </p>
            <Link replace to="/" className="nav-link">
                Return Home
            </Link>
        </div>
    );
}

export default NotMatch;
