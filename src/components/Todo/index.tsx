import React, {useState} from 'react';
import Input from "antd/lib/input/Input";
import {Typography} from "antd";

const { Title } = Typography;

const ToDo = () => {

    const [todos,setTodos] = useState([])

    return (
        <div>
            <Title level={3}>Thinks To do</Title>
            <Input placeholder="Basic usage" />

        </div>
    );
};

export default ToDo;