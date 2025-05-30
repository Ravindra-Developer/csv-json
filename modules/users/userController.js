const userService = require('./userService');

const getAllUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsers();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const parseCsvAndAddToDb = async (req, res) => {
    try {
        const result = await userService.parseCsvAndAddToDb();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    parseCsvAndAddToDb
};
