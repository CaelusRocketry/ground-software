import React from 'react';
import Message from '../components/Message';
import Header from "../components/Header";

const MessagePane = () => (
    <div>
        <Header title="Messages" />
        <Message />
    </div>
);

export default MessagePane;