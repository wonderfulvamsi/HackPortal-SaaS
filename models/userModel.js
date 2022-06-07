const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    organizer_wallet_id: { type: String, required: true },
    event_name: { type: String, required: true },
    user_wallet_id: { type: String, required: true },
    user_type: { type: String },
    need_team: { type: Boolean, default: false },
    visible_profile: { type: Boolean, default: false },
    user_name: { type: String },
    institute: { type: String },
    mobileno: { type: Number },
    email: { type: String },
    linkedin_url: { type: String },
    github_url: { type: String },
    portfolio_url: { type: String },
    bio: { type: String },
    skills: { type: Array },
    ideas: { type: Array }
}
);

const UserData = mongoose.model('UserData', userSchema)

module.exports = UserData;