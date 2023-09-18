import { Query } from './index';
import { Chirp } from './types/index'

const all = async () => Query('SELECT * FROM users');
const getOne = (id: Chirp["id"]) => Query('SELECT * FROM users WHERE id=?', [id]);
const create = (name: string, email: string, password: string) => Query('INSERT INTO users (name) (email) (password) VALUES (?)', [name, email, password]);
const update = (name: string, email: string, password: string,) => Query('UPDATE users SET name=? SET email=? SET password=? WHERE id=?', [name, email, password]);
const destroy = (id: Chirp["id"]) => Query('DELETE FROM Users WHERE id=?', [id]);

export default {
    all,
    getOne,
    create,
    update,
    destroy
}