import { Query } from './index';
import { User } from './types/index'


const all = async () => Query('SELECT * FROM chirps');
const getOne = (id: User["id"]) => Query('SELECT * FROM chirps WHERE id=?', [id]);
const create = (userid: User["id"], content: string, location: string) => Query('INSERT INTO chirps (userid, content, location) VALUES (?, ?, ?)', [userid, content, location]);
const update = (id: User["id"], content: string, location: string) => Query('UPDATE chirps SET content=?, location=? WHERE id=?', [content, location, id]);
const destroy = (id: User["id"]) => Query('DELETE FROM chirps WHERE id=?', [id]);
const destroyAllUser = (userid: User["id"]) => Query('DELETE FROM chirps WHERE userid=?', [userid]);


export default {
    all,
    getOne,
    create,
    update,
    destroy,
    destroyAllUser
};