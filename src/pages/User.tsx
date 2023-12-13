import React, { useState, useCallback } from 'react';

interface UserProps {
    id?: number | string | null;
}
export default function User(props: UserProps): JSX.Element {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<Record<string, string | number> | null>(null);

    const fetchUserData = useCallback(async (id: string | number | null | undefined) => {
        if (!id) {
            return;
        }

        setLoading(true);
        const response = await fetch('/' + id);
        const user = await response.json();
        setUser(user);
        setLoading(false);
    }, []);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            fetchUserData(props?.id);
        },
        [fetchUserData, props]
    );

    // useEffect(() => {
    //     fetchUserData(props?.id);
    // }, [props?.id]);

    // if (!user) {
    //     if (loading) {
    //         return <i>loading...</i>
    //     }

    //     return <p>no user</p>;
    // }

    return (
        <details>
            <button onClick={handleClick}>fetch-user</button>
            {!user ? (
                loading ? (
                    <i>loading...</i>
                ) : (
                    <p>no user</p>
                )
            ) : (
                <>
                    <summary>{user.name}</summary>
                    <strong>{user.age}</strong> years old
                    <br />
                    lives in {user.address}
                </>
            )}
        </details>
    );
}
