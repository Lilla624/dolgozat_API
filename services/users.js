const db = require('./db');

async function getAll() {
    return await db.query('SELECT * FROM users');
}

async function create(user) {
    const result = await db.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [user.name, user.email]
    );
    return { id: result.insertId, ...user };
}

async function update(id, user) {
    const result = await db.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [user.name, user.email, id]
    );
    return result.affectedRows > 0;
}

async function remove(id) {
    const result = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

async function patch(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    
    const sql = `UPDATE users SET ${keys.map(key => `${key} = ?`).join(', ')} WHERE id = ?`;
    const result = await db.query(sql, [...values, id]);
    return result.affectedRows > 0;
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    patch
};
