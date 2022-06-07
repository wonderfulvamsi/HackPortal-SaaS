const router = require('express').Router();

let EventData = require('../models/eventModel');

let UserData = require('../models/userModel');

let TeamData = require('../models/teamModel');

let SubmissionData = require('../models/submissionModel');

require('dotenv').config();

//get event info
router.get('/info', async (req, res) => {
    res.status(200).json(await EventData.findOne({ event_name: req.body.event_name }));
})

//create an event
router.post('/create', async (req, res) => {
    try {
        const newevent = new EventData({
            organizer_wallet_id: req.body.organizer_wallet_id,
            event_name: req.body.event_name,
            event_logo: req.body.event_logo,
            event_wall_pic: req.body.event_wall_pic,
            event_link: req.body.event_link,
            event_disc: req.body.event_disc,
            event_social_links: req.body.event_social_links,
            prizes: req.body.prizes,
            judges: req.body.judges,
            sponsors: req.body.sponsors,
            timeline: req.body.timeline,
            teams: req.body.teams
        });
        res.status(200).json(await newevent.save())
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//update event 
router.patch('/updateevent', async (req, res) => {
    try {
        const event = await EventData.findOne({ event_name: req.body.event_name });
        res.status(200).json(await event.updateOne(
            {
                event_name: req.body.event_name,
                event_logo: req.body.event_logo,
                event_wall_pic: req.body.event_wall_pic,
                event_link: req.body.event_link,
                event_disc: req.body.event_disc,
                event_social_links: req.body.event_social_links,
                prizes: req.body.prizes,
                judges: req.body.judges,
                sponsors: req.body.sponsors,
                timeline: req.body.timeline,
                teams: req.body.teams,
                announcemts: req.body.announcemts
            }
        ))
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//delete event
router.delete('/delevent', async (req, res) => {
    try {
        const event = await EventData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id });
        res.status(200).json(await event.deleteOne())
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get all teams of an event
router.get('/allteams', async (req, res) => {
    try {
        const event = await EventData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id });
        res.status(200).json(await event.teams);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get team info
router.get('/teaminfo', async (req, res) => {
    try {
        res.status(200).json(await TeamData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id, team_leader_wallet_id: req.body.team_leader_wallet_id }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get all submissions
router.get('/allsubmissions', async (req, res) => {
    try {
        res.status(200).json(await SubmissionData.find({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get a submission
router.get('/submissioninfo', async (req, res) => {
    try {
        res.status(200).json(await SubmissionData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id, team_leader_wallet_id: req.body.team_leader_wallet_id }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get all visible profiles
router.get('/allvisibleprofiles', async (req, res) => {
    try {
        res.status(200).json(await UserData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id, visible_profile: true }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get a user profile 
router.get('/allvisibleprofiles', async (req, res) => {
    try {
        res.status(200).json(await UserData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id, user_wallet_id: req.body.user_wallet_id }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;