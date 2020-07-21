import React, {useState} from "react";
import {FaCheck} from "react-icons/fa";

export const CreateTodo = ({handleClickCreate, textLanguage}) => {
    const [noteNew, setNoteNew] = useState('');
    const [commitNoteNew, setCommitNoteNew] = useState('');

    const handleClick = () => {
        handleClickCreate(noteNew, commitNoteNew);
        setNoteNew('');
        setCommitNoteNew('');
    };

    return (
        <div className="tasks__create">
            <input value={noteNew} onChange={e => setNoteNew(e.target.value)} type="text"/>
            <button disabled={!noteNew} onClick={() => handleClick()}><FaCheck/>{textLanguage("button")}</button>
            <div className="tasks__create__commit">
                <span>{textLanguage("label.commit")}: </span>
                <textarea value={commitNoteNew} cols="30" rows="10" onChange={e => setCommitNoteNew(e.target.value)} />
            </div>
        </div>
    );
};