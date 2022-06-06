const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    organizer_wallet_id: { type: String, required: true },
    event_name: { type: String, required: true },
    team_name: { type: String, required: true, unique: true },
    team_leader_wallet_id: { type: String, required: true, unique: true },
    teammates_wallet_ids: { type: Array },
}
);

const TeamData = mongoose.model('TeamData', teamSchema)

module.exports = TeamData;