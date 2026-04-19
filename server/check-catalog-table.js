const db = require('./config/db');

async function checkTables() {
    try {
        const [rows] = await db.query('SHOW TABLES');
        console.log('Tables in database:');
        rows.forEach(row => {
            const tableName = Object.values(row)[0];
            console.log(' -', tableName);
        });

        // Check if catalogs table exists
        const [catalogs] = await db.query("SHOW TABLES LIKE 'catalogs'");
        if (catalogs.length === 0) {
            console.log('\n❌ Table "catalogs" does NOT exist!');
            console.log('Run: mysql -u root -p zok_website < server/add_cooperation_catalog_tables.sql');
        } else {
            console.log('\n✅ Table "catalogs" exists');
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        process.exit();
    }
}

checkTables();
