let notes = [
    {
        id: '1',
        note: 'create note',
        commit: 'some comments on the note'
    }, {
        id: '2',
        note: 'create note2',
        commit: 'some comments on the note'
    }, {
        id: '3',
        note: 'create note3',
        commit: 'some comments on the note'
    }
];

exports.notes = async (req, res) => {
    try {
        let notesArr = [];
        await notes.forEach( note => notesArr.push( {id: note.id, note: note.note}));
        await res.send(notesArr);
    } catch (err) {
        res.status(500).json({error: 'Something wrong with show notes'});
        console.error(err);
    }
};
exports.noteGet = async (req, res) => {
    try {
        const idNote = req.params.id;
        const note = await notes.find( el => el.id === idNote);
        if (note.length === 0) {
            await res.status(500).json({error: 'Note does not exist'});
        } else {
            await res.send(note);
        }
    } catch (err) {
        res.status(500).json({error: 'Something wrong with get note'});
        console.error(err);
    }
};
exports.noteCreate = async(req, res) => {
    try {
        const note = {
            id: Date.now().toString(),
            note: req.body.note,
            commit: req.body.commit
        };
        notes.push(note);
        await res.send(notes);
    } catch (err) {
        res.status(500).json({error: 'Something wrong with create note'});
        console.error(err);
    }
};
exports.noteUpdate = async(req, res) => {
    try {
        // notes[req.params.id].note = await req.body.note;
        let notesArr = [];
        await notes.forEach(el => {
            if (el.id === req.params.id)
                el.note = req.body.note;
            notesArr.push( {id: el.id, note: el.note});
        });
        await res.send(notes);
    } catch (err) {
        res.status(500).json({error: 'Something wrong with update note'});
        console.error(err);
    }
};
exports.noteDelete = async (req, res) => {
    try {
        const idNote = req.params.id;
        notes = [...notes.filter(elem => elem.id !== idNote)];
        let notesArr = [];
        await notes.forEach( note => notesArr.push( {id: note.id, note: note.note}));
        res.send(notesArr);
    } catch (err) {
        res.status(500).json({error: 'Something wrong with delete note'});
        console.error(err);
    }
};