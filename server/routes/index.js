const {Router} = require('express');
const router = Router();

const {notes, noteGet, noteCreate, noteUpdate, noteDelete} = require('./notes');

router.get('/notes', notes);
router.get('/notes/:id', noteGet);
router.post('/notes/', noteCreate);
router.put('/notes/:id', noteUpdate);
router.delete('/notes/:id', noteDelete);

module.exports = router;