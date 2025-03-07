const pool = require('../config/db');

class Product {

    static async getBestSellers(limit){
        var query =``;
        var res;
        if(limit === undefined){
            query = `
                SELECT * FROM products;
            `;
            res = await pool.query(query);
        } else {
            query = `
                SELECT * FROM products
                LIMIT $1;
            `;
            res = await pool.query(query, [limit]);
        }
        return res.rows;
    }
}

module.exports = Product;