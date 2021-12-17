import dotenv from 'dotenv';
import neo4j from 'neo4j-driver';

dotenv.config();

const connectDB = () => {
    const driver = neo4j.driver(
        process.env.NEO4J_BOLT,
        neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD), {
            /* encrypted: 'ENCRYPTION_OFF' */
        }
    );

    const query = `
            MATCH (n)
            RETURN (n)`;

    const params = { limit: 10 };

    const session = driver.session({ database: 'neo4j' });

    session
        .run(query, params)
        .then((result) => {
            result.records.forEach((record) => {
                console.log(record);
            });
            session.close();
            driver.close();
        })
        .catch((error) => {
            console.error(error);
        });
};

connectDB();