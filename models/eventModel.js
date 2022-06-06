const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    organizer_wallet_id: { type: String, required: true },
    event_name: { type: String, required: true, unique: true },
    event_logo: { type: String, required: true },
    event_wall_pic: { type: String },
    event_link: { type: String },
    event_disc: { type: String },
    event_social_links: { type: Array },
    prizes: { type: Array }, //a array of json with track & price feilds
    judges: { type: Array }, //a array of json with judge details feilds
    sponsors: { type: Array }, // a array of json with sponsor details
    timeline: { type: Array, required: true }, // a array of json with date, stage and disc as feilds
    teams: { type: Array }
}
);


const EventData = mongoose.model('EventData', eventSchema)

module.exports = EventData;