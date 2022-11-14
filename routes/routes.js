const fs = require('fs');
const path = require('path');

module.exports = app => {

fs.readFile('Develop/db/db.json', 'utf8', (err, data) => {
    if (err) console.log(err);
    const notes = JSON.parse(data);

    app.get('/api/notes', (req, res) => {
        res.json(notes);
    })

    app.post('/api/notes', (req, res) => {
        let note = req.body;
        notes.push(note);
        updateDB();
        return console.log('New note added: ' +note.title);
    })

    app.get('/api/notes/:id', (req, res) => {
        res.json(notes[req.params.id]);
    })

    app.delete('/api/notes/:id', (req, res) => {
        const id = req.params.id;
        notes.splice(id, 1);
        updateDB();
        console.log('Deleted note ' + id);
    })

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../Develop/public/notes.html'));
    })

    app.get('*', (rep, res) => {
        res.sendFile(path.join(__dirname, '../Develop/public/index.html'));
    })

    function updateDB() {
        fs.writeFile("Develop/db/db.json", JSON.stringify(notes,'\t'), err => {
            if (err) console.log(err);
            return true;
        })
    }
})
}