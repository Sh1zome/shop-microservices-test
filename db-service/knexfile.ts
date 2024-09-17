module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/mydb.sqlite'
        },
        useNullAsDefault: true,
    },
};
