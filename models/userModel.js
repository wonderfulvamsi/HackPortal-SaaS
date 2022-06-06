const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_wallet_id: { type: String, required: true },
    user_type: { type: String },
}
);

const UserData = mongoose.model('UserData', userSchema)

module.exports = UserData;