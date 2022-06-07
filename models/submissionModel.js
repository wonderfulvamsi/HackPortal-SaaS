const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    organizer_wallet_id: { type: String, required: true },
    event_name: { type: String, required: true, unique: true },
    team_name: { type: String, required: true, unique: true },
    team_leader_wallet_id: { type: String, required: true, unique: true },
    teammates_wallet_ids: { type: Array, required: true },
    team_logo: { type: String },
    live_link: { type: String },
    repo_link: { type: String },
    video_link: { type: String },
    doc_link: { type: String },
    pics: { type: Array },
    comments: { type: Array }, // a array of json with comment & author as feilds
    judge_coin: { type: Number, default: 0 },
    competitor_coin: { type: Number, default: 0 },
    people_coin: { type: Number, default: 0 }
}
);

const SubmissionData = mongoose.model('SubmissionData', submissionSchema)

module.exports = SubmissionData;