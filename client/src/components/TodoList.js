import React, {useEffect, useState} from "react";
import { Todo } from "./Todo";
import axios from "axios";
import {CreateTodo} from "./CreateTodo";
import {useTranslation} from "react-i18next";

export const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const {t, i18n} = useTranslation();

    useEffect(() => {
            axios.get('/notes')
                .then(res => {
                    setTodos(res.data);
                })
                .catch(err => console.error(err));
    }, [todoList]);

    const setTodos = (data) => {
        const allNotes = data.map(note => ({
            ...note
        }));
        if(JSON.stringify(allNotes) !== JSON.stringify(todoList)) {
            setTodoList(allNotes);
        }
    };
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    const handleClickDelete = (id) => {
        axios.delete(`/notes/${id}`)
            .then(res => {
                setTodos(res.data);
            })
            .catch(err => console.error(err));

    };
    const handleClickUpdate = (note) => {
        axios.put(`/notes/${note.id}`, {note: note.note})
            .then(res => {
                setTodos(res.data);
            })
            .catch(err => console.error(err));
    };
    const handleClickCreate = (note, commit) => {
        axios.post(`/notes`, {note: note, commit:commit})
            .then(res => {
                setTodos(res.data);
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="tasks">
            <header className="tasks__heading">
                <h1>{t("title")}</h1>
                <div className="tasks__row__button">
                    <button onClick={() => handleChangeLanguage('en')}>EN</button>
                    <button onClick={() => handleChangeLanguage('ru')}>RU</button>
                </div>
            </header>
            <CreateTodo handleClickCreate = {handleClickCreate} textLanguage = {t} />
            {
                todoList.map( note =>
                    <Todo key={note.id} note={note} handleClickUpdate={handleClickUpdate} handleClickDelete={handleClickDelete} textLanguage = {t} />
                )
            }
        </div>
    );
};

