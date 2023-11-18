import * as React from 'react';
import { Router } from 'react-router-dom';

export type MessageIProps = {
    body: string;
    from: string;
};

export type MessageComponent = React.FC<MessageIProps> & { router?: Router };

const Message: MessageComponent = (props: MessageIProps): JSX.Element => {
    return (
        <div className="message-item">
            <div className="message-header">{`You got a new message from ${props.from}:`}</div>
            <div className="message-body">{props.body}</div>
        </div>
    );
};

export default Message;
