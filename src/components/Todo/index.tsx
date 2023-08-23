import React, {useState} from 'react';
import Input from "antd/lib/input/Input";
import {Checkbox, Typography} from "antd";
import classes from './ToDo.module.scss';
import {IToDo} from "../../types";
import {CheckboxChangeEvent} from "antd/es/checkbox";


const {Title} = Typography;

const ToDo = () => {

    const [todos, setTodos] = useState<IToDo[]>([])
    const [value, setValue] = useState<string>('')

    const onChange = (e: CheckboxChangeEvent) => {

    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTodos([{
            id: Math.random(),
            name: value,
            checked: false
        },...todos])
        setValue('')
    }

    return (
        <div className={classes.todoContainer}>
            <Title level={3}>Thinks To do</Title>
            <form onSubmit={onSubmit}>
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Add new"
                />
            </form>
            <div className={classes.todoContainer_list}>
                {todos.map(todo => (
                    <div className={classes.todoContainer_list_item} key={todo.id}>
                        <Checkbox
                            checked={todo.checked}
                            onChange={onChange}
                        >
                            {todo.name}
                        </Checkbox>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ToDo;