import colors from 'colors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const migrateData = async() => {
    const fileName = 'migrate-data.json';
    const gistID = '684945f97cd6ce406c3a01b7c7cdeb01';

    const url = 'https://api.github.com/gists/' + gistID;

    try {
        const results = await axios.get(url);
        const contents = results.data.files[fileName].content;

        console.log(contents);
        console.log('All tasks handled!'.green.inverse);

        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async() => {
    await console.log('deleting alll'.red.inverse);
};

if (process.argv == '-d') {
    destroyData();
} else {
    migrateData();
}