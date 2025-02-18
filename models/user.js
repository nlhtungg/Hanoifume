const pool = require('../config/db');

class User {
    static async createUser(username, email, password) {
        const query = `
            INSERT INTO users (username, email, pword)
            VALUES ($1, $2, $3)
        `;
        await pool.query(query, [username, email, password]);
    }

    static async findByUsername(username) {
        const query = `
            SELECT * FROM users
            WHERE username = $1;
        `;
        const values = [username];
        const res = await pool.query(query, values);
        return res.rows[0];
    }
    
    static async findByEmail(email) {
        const query = `
            SELECT * FROM users
            WHERE email = $1;
        `;
        const values = [email];
        const res = await pool.query(query, values);
        return res.rows[0];
    }

    static async findById(id) {
        const query = `
            SELECT * FROM users
            WHERE id = $1;
        `;
        const res = await pool.query(query, [id]);
        return res.rows[0];
    }
}

module.exports = User;