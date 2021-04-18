import React from 'react';
import Form from "./components/Form";
import List from "./components/List";
import TotalComplete from './components/TotalComplete';


export default function Todo() {
    return (
        <>
            <Form />
            <TotalComplete />
            <List />
        </>
    );
}

