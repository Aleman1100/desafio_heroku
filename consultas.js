const { Pool } = require('pg');
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    password: '',
    database: 'heroku_desafio',
    port: 5432,
});

async function nuevoUsuario(username, email, password) {
    try {
        const result = await pool.query(
            `INSERT INTO usuario (username, email, password) values ('${username}','${email}','${password}') RETURNING *`            
        );
        return result.rows;
    } catch(e){
        return e;
    }
}

async function getUsuarios() {
    try {
        const result = await pool.query(`SELECT * FROM usuario`);
        return result.rows;
    } catch (e) {
        return e;
    }
}

async function deleteUsuario(id){
    try {
        const result = await pool.query(`DELETE FROM usuario WHERE id = '${id}'`);
        return result.rowCount;
    } catch (e){
        return e;
    }
}

module.exports = {
    nuevoUsuario,
    getUsuarios,
    deleteUsuario
};