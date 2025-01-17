const db = require('./db');

async function getAll() {
    return await db.query('SELECT * FROM data_table');
}

async function create(user) {
    const result = await db.query(
        'INSERT INTO data_table (name, value, category, timestamp) VALUES (?, ?)',
        [user.name, user.value, user.category, user.timestamp]
    );
    return { id: result.insertId, ...user };
}

async function update(id, user) {
    const result = await db.query(
        'UPDATE data_table SET name = ?, value = ?, category = ?, timestamp = ? WHERE id = ?',
        [user.name, user.value, user.category, user.timestamp, id]
    );
    return result.affectedRows > 0;
}

async function remove(id) {
    const result = await db.query('DELETE FROM data_table WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

async function patch(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    
    const sql = `UPDATE data_table SET ${keys.map(key => `${key} = ?`).join(', ')} WHERE id = ?`;
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
