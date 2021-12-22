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

    return driver;
};

export default connectDB;