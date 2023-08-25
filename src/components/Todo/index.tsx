import React, { useMemo, useState } from "react";
import Input from "antd/lib/input/Input";
import { Button, Checkbox, Typography } from "antd";
import classes from "./ToDo.module.scss";
import { IToDo } from "../../types";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const { Title, Text } = Typography;

const ToDo = () => {
  const [todos, setTodos] = useState<IToDo[]>([]);
  const [value, setValue] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<
    "complited" | "active" | null
  >(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([
      {
        id: Math.random(),
        name: value,
        checked: false,
      },
      ...todos,
    ]);
    setValue("");
  };

  const onChange = (e: CheckboxChangeEvent, id: number) => {
    const newToDos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          checked: e.target.checked,
        };
      }
      return todo;
    });
    setTodos(newToDos);
  };

  const list = useMemo(() => {
    switch (filterStatus) {
      case "active":
        return todos.filter((todo) => !todo.checked);
      case "complited":
        return todos.filter((todo) => todo.checked);
      default:
        return todos;
    }
  }, [filterStatus, todos]);

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
        {list.map((todo) => (
          <div className={classes.todoContainer_list_item} key={todo.id}>
            <Checkbox
              checked={todo.checked}
              onChange={(e) => {
                onChange(e, todo.id);
              }}
            />

            <Text
              style={{
                marginLeft: "10px",
                textDecoration: todo.checked ? "line-through" : "unset",
              }}
            >
              {todo.name}
            </Text>
          </div>
        ))}
      </div>
      <div className={classes.divFooter}>
        <div>
          <Text>{list.length} Tasks</Text>
        </div>
        <div>
          <Button
            onClick={() => {
              setFilterStatus(null);
            }}
          >
            All tasks
          </Button>
          <Button
            onClick={() => {
              setFilterStatus("active");
            }}
          >
            Active
          </Button>
          <Button
            onClick={() => {
              setFilterStatus("complited");
            }}
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
