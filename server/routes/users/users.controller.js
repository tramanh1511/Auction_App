const {
    getAllUsers,
    getUserById,
    createNewUser,
    deleteUserById,
    editUser,
} = require('../../models/users.model');

async function httpGetAllUsers(req, res) {
    const users = await getAllUsers();
    return res.status(200).json(users);
}

async function httpGetUserById(req, res) {
    const userId = Number(req.params.id);

    const user = await getUserById(userId);
    if (!user) {
        return res.status(404).json({
            error: 'User not found',
        });
    }
    return res.status(200).json(user);
}

async function httpAddNewUser(req, res) {
    const user = req.body;

    try {
        await createNewUser(user);
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(201).json(user);
}

async function httpEditUser(req, res) {
    const user = req.body;
    user.id = Number(req.params.id);

    try {
        const modifiedUser = await editUser(user);
        return res.status(200).json(modifiedUser);
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
}

async function httpDeleteUserById(req, res) {
    const userId = Number(req.params.id);

    const user = await getUserById(userId);
    if (!user) {
        return res.status(404).json({
            error: 'User not found',
        });
    }

    const deleted = await deleteUserById(userId);
    if (!deleted) {
        return res.status(400).json({
            error: 'Launch not aborted',
        });
    }

    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpGetAllUsers,
    httpGetUserById,
    httpAddNewUser,
    httpEditUser,
    httpDeleteUserById,
};