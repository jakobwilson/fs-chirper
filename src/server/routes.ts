import * as express from 'express';

import database from './database';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/chirps', async (req, res) => {
    try {
        const chirps = await database.chirps.all();
        res.json(chirps);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/chirps/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const chirps = await database.chirps.getOne(id);
        res.json(chirps[0]);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: "chirp unavaliable"});
    }
});

router.post('/api/chirps', async (req, res) => {
    try {
        const { userid, content, location } = req.body;
        if (!userid || !content || !location) return res.status(400).json({message: "missing data."});
        const results = await database.chirps.create(userid, content, location);
        res.status(201).json({message: "chirp created."});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: " Couldn't add that chirp."});
    }
});

router.put('/api/chirps/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { userid, content, location } = req.body;
        if (!content || !location) return res.status(400).json({message: "missing data."});
        const results = await database.chirps.update(id, content, location);
        res.status(201).json({message: "chirp updated.", results});
    } catch(e) {
        console.log(e);
        res.status(500);
    }
})

router.delete('/api/chirps/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        await database.chirps.destroy(id);
        res.status(200).json({message: "Chirp deleted."});
    } catch(e) {
        console.log(e);
        res.status(500).json({message: "Unable to delete chirp."});
    }
});

router.get('/api/users', async (req, res) => {
    try {
        res.json(await database.users.all());
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/users/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const users = await database.users.getOne(id);
        res.json(users[0]);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

router.delete('/api/users/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        await database.chirps.destroyAllUser(id);
        await database.users.destroy(id);
        res.status(200).json({message: "User deleted."});
    } catch(e) {
        console.log(e);
        res.status(500);
    }
});



export default router;