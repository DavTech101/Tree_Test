import Neode from 'neode';
import dotenv from 'dotenv';

dotenv.config();

export const createModel = (instance) => {
    instance.model('Node', {
        node_id: {
            primary: true,
            type: 'uuid',
            required: true, // Creates an Exists Constraint in Enterprise mode
        },
        name: {
            type: 'name',
            index: true,
            required: true, // Creates an Index
        },
        description: 'string',
        parent: 'string',
    });
};

const createInstance = () => {
    const instance = new Neode(
        process.env.NEO4J_BOLT,
        process.env.NEO4J_USERNAME,
        process.env.NEO4J_PASSWORD,
        true
    );

    return instance;
};

export default createInstance;