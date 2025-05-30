const pool = require('../../helpers/db');
const fs = require('fs');
const readline = require('readline');

class UserService {

    async getAllUsers() {
        const query = `SELECT * FROM public.users;`;
        return (await pool.query(query)).rows;
    }

    async parseCsvAndAddToDb() {
        const filePath = process.env.CSV_FILE_PATH;
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({ input: fileStream });
        let headers = [];
        let lineIndex = 0;
        const batchSize = 1000;
        const batch = [];

        const groups = {
            '< 20': 0,
            '20 to 40': 0,
            '40 to 60': 0,
            '> 60': 0,
        };
        let total = 0;

        for await (const line of rl) {
            const values = line.split(',');
            if (lineIndex === 0) {
                headers = values.map(header => header.trim());
            } else {
                const obj = {};
                values.forEach((value, index) => {
                    const key = headers[index];
                    this.setNestedValue(obj, key, value.trim());
                });
                const group = this.getAgeGroup(obj.age);
                if (group) {
                    groups[group]++;
                    total++;
                }
                batch.push(this.generateToInsertValues(obj));
                if (batch.length >= batchSize) {
                    await insertBatch(batch);
                    batch.length = 0;
                }
            }
            lineIndex++;
        }

        if (batch.length > 0) {
            await this.insertBatch(batch);
        }

        this.logAgeDistributionPercentage(groups, total);
        return 'csv parsed and added to db successfully';
    }

    setNestedValue(obj, path, value) {
        const keys = path.split('.');
        let current = obj;

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (i === keys.length - 1) {
                current[key] = value;
            } else {
                if (!current[key] || typeof current[key] !== 'object') {
                    current[key] = {};
                }
                current = current[key];
            }
        }
    }

    getAgeGroup(age) {
        age = parseInt(age, 10);
        if (age < 20) return '< 20';
        if (age <= 40) return '20 to 40';
        if (age <= 60) return '40 to 60';
        return '> 60';
    }

    generateToInsertValues(obj) {
        const name = `'${obj.name?.firstName} ${obj.name?.lastName}'`.trim();
        const age = parseInt(obj.age, 10);

        const address = obj.address
            ? `'${JSON.stringify(obj.address)}'::jsonb`
            : 'NULL';

        const { name: _, age: __, address: ___, ...rest } = obj;
        const additional = Object.keys(rest).length > 0
            ? `'${JSON.stringify(rest)}'::jsonb`
            : 'NULL';

        return `(${name}, ${age}, ${address}, ${additional})`;
    }

    async insertBatch(batch) {
        const query = `
          INSERT INTO public.users (name, age, address, additional_info)
          VALUES ${batch.join(', ')};
        `;
        try {
            await pool.query(query);
        } catch (error) {
            console.error('Error inserting batch:', error);
            throw error;
        }
    }

    logAgeDistributionPercentage(groups, total) {
        // Header
        const col1 = 'Age-Group'.padEnd(15);
        const col2 = '% Distribution'.padStart(15);
        console.log(`${col1}|${col2}`);
        console.log('-'.repeat(15) + '+' + '-'.repeat(15));

        // Rows
        for (const [range, count] of Object.entries(groups)) {
            const percentage = ((count / total) * 100).toFixed(2);
            const left = range.padEnd(15);
            const right = percentage.toString().padStart(15);
            console.log(`${left}|${right}`);
        }
    }
}

module.exports = new UserService();
