import connectDB from '../config/db.js';
import createTree from '../config/createTree.js';

// @desc    GET All Nodes data
// @route   GET /api/data
// @access  Public
export const getData = async(req, res) => {
    const driver = connectDB();
    const session = driver.session({ database: 'neo4j' });

    const query = `
        MATCH (n)
        RETURN n
        `;

    const result = await session.run(query);

    if (result) {
        const nodes = [];
        const records = result.records;

        for (let i = 0; i < records.length; i++) {
            nodes.push(records[i]._fields[0].properties);
        }

        const tree = nodes; //createTree(nodes);
        res.json(tree);
    } else {
        res.status(404);
        throw new Error('Nodes data not found');
    }
};