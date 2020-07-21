import React, {useEffect, useState} from "react";
import {FaPencilAlt, FaRegTrashAlt, FaCheck, FaRegEdit} from "react-icons/fa";
import axios from "axios";

export const Todo = ({note, handleClickDelete, handleClickUpdate, textLanguage}) => {
    const [update, setUpdate] = useState(false);
    const [updateNote, setUpdateNote] = useState('');
    const [commitNote, setCommitNote] = useState('');
    const [commitShow, setCommitShow] = useState(false);

    const handleUpdate = () => {
        setUpdate(!update);
        const task = {
            id: note.id,
            note: updateNote
        };
        if (JSON.stringify(updateNote)!== JSON.stringify(note.note))
            handleClickUpdate(task);
    };

    const handleGetCommit = () => {
        axios.get(`/notes/${note.id}`)
            .then(res => {
                setCommitNote(res.data.commit);
            })
            .catch(err => console.error(err));
        setCommitShow(!commitShow);
    };

    useEffect(() => {
        setUpdateNote(note.note);
    }, [note.note]);

    return (
        <div className="tasks__row">
            {
                update ?
                    <>
                        <input className="tasks__row__input" type="text" value={updateNote} onChange={ e => setUpdateNote(e.target.value)} />
                        <span className="tasks__row__button">
                            <button className="tasks__row" onClick={() => handleUpdate()}><FaCheck /></button>
                        </span>
                    </>
                    :
                    <>
                        <span className="tasks__row__text">{note.note}</span>
                        <span className="tasks__row__button">
                            <button onClick={() => setUpdate(!update)}><FaPencilAlt/></button>
                            <button onClick={() => handleGetCommit()}><FaRegEdit/></button>
                            <button onClick={() => handleClickDelete(note.id)}><FaRegTrashAlt/></button>
                        </span>
                    </>
            }

            {
                commitShow &&
                    <div className="tasks__row__commit">
                        <span>{textLanguage("label.commit")}:</span>
                        {commitNote.length > 0 ? commitNote : "no commit"}
                    </div>
            }
        </div>
    );
};