import axios from 'axios';
import colors from 'colors';
import dotenv from 'dotenv';
import nodes from './data/nodes.js';
import connectDB from './config/db.js';
import createInstance, { createModel } from './config/model.js';

dotenv.config();

const makeModel = async() => {
    const instance = createInstance();
    createModel(instance);
};

/*
    Clean up the database
*/
const destroyData = async() => {
    const driver = connectDB();
    const session = driver.session({ database: 'neo4j' });

    const query = `
        MATCH (n)
        DETACH DELETE (n)
        `;

    try {
        await session.run(query);
        console.log('All Data destroyed!'.green.inverse);

        session.close();
        driver.close();
    } catch (error) {
        console.error(`${error}`.red.inverse);
    }
};

/*
    Gets data with usage of gist link or from data folder
*/
const getData = async() => {
    if (process.env.GIST_ID) {
        const gistID = process.env.GIST_ID;
        const fileName = process.env.GIST_FILENAME;

        const url = 'https://api.github.com/gists/' + gistID;

        try {
            const results = await axios.get(url);
            const data = results.data.files[fileName].content;

            console.log('Data retrieved from Gist!'.green.inverse);
            return JSON.parse(data);
        } catch (error) {
            console.error(`${error}`.red.inverse);
            process.exit(1);
        }
    } else {
        return nodes;
    }
};

/*
     Adds Data to Database when array of data is given
*/
const migrateDataToDB = async() => {
    const driver = connectDB();
    const result = await getData();

    if (result['data']) {
        const data = result['data'];

        data.map(async(point) => {
            try {
                const session = driver.session({ database: 'neo4j' }); // Open new session every
                const query = `
                    CREATE (n:Node {name: '${point.name}', description: '${point.description}', parent: '${point.parent}' })
                `;

                await session.run(query);

                await session.close();
                await driver.close();
            } catch (error) {
                console.error(`${error}`.red.inverse);
                process.exit(1);
            }
        });

        console.log('All Data Added successfully!'.green.inverse);
    } else {
        console.log('No Data to be added'.orange.inverse);
    }
};

/*
     Create relations for Nodes 
*/
const createRelations = async() => {
    const driver = connectDB();
    const result = await getData();

    if (result['data']) {
        const childs = result['data'].filter((node) => node.parent.length > 0);

        childs.map(async(point) => {
            try {
                const session = driver.session({ database: 'neo4j' });

                const query = `
                    MATCH
                      (a:Node),
                      (b:Node)
                    WHERE a.name = '${point.name}' AND b.name = '${point.parent}'
                    CREATE (a)-[r:CHILD_OF]->(b)
                    RETURN type(r)
                `;

                await session.run(query);

                await session.close();
            } catch (error) {
                console.error(`${error}`.red.inverse);
                process.exit(1);
            }
        });

        console.log('All Data Related succesfully!'.green.inverse);
        await driver.close();
    } else {
        console.log('No Data to be Related!'.orange.inverse);
        await driver.close();
    }
};

const setupData = async() => {
    await migrateDataToDB();
    await createRelations();
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    setupData();
}