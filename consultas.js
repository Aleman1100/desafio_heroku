const { Pool } = require('pg');
const pool = new Pool ({
    user: 'tmalvhhdsbupgm',
    host: 'ec2-18-215-96-22.compute-1.amazonaws.com',
    password: '59d83d268d42212845abcb1752e6cb49583578a5f7d59cab69a6a1e02a0846ab',
    database: 'dan2kou3pgom45',
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
