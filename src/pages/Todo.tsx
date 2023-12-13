import { useState, useCallback, useEffect } from 'react';

interface TodoProps {
    id?: number | string;
}

export default function Todo(props: TodoProps): JSX.Element {
    const [loading, setLoading] = useState(false);
    const [todo, setTodo] = useState<Record<string, string | number> | null>(null);

    const fetchTodoData = useCallback(async (id?: string | number) => {
        if (!id) {
            return;
        }

        setLoading(true);
        const response = await fetch('/' + id);
        const todo = await response.json();
        setTodo(todo);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchTodoData(props?.id);
    }, [props?.id, fetchTodoData]);

    if (!todo) {
        if (loading) {
            return <i>loading...</i>;
        }

        return <p>no todo</p>;
    }

    return (
        <details>
            <summary>
                title: <span>{todo.title}</span>
            </summary>
            <strong>
                body: <span>{todo.body}</span>
            </strong>
        </details>
    );
}
