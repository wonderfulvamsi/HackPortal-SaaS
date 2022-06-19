const router = require('express').Router();

let EventData = require('../models/eventModel');

let UserData = require('../models/userModel');

let TeamData = require('../models/teamModel');

let SubmissionData = require('../models/submissionModel');

require('dotenv').config();

//get event info
router.get('/info/:event_id', async (req, res) => {
    const { event_id } = req.params;
    try {
        res.status(200).json(await EventData.findOne({ _id: event_id }));
    }
    catch (err) {
        res.status(500).json(err);
    }
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
            submission_date: req.body.submission_date,
            end_date: req.body.end_date,
            teams: req.body.teams,
            judge_coin_holders: req.body.judge_coin_holders,
            competitor_coin_holders: req.body.competitor_coin_holders,
            people_coin_holders: req.body.people_coin_holders,
        });
        res.status(200).json(await newevent.save())
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//add event address
router.patch('/addeventaddress', async (req, res) => {
    try {
        const event = await EventData.findOne({ _id: req.body.event_id });
        res.status(200).json(await event.updateOne(
            {
                event_address: req.body.event_address
            }
        ))
    }
    catch (err) {
        res.status(500).json(err)
    }
})


//update event 
router.patch('/updateevent', async (req, res) => {
    try {
        const event = await EventData.findOne({ _id: req.body.event_id });
        res.status(200).json(await event.updateOne(
            {
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
                submission_date: req.body.submission_date,
                end_date: req.body.end_date,
                teams: req.body.teams,
                judge_coin_holders: req.body.judge_coin_holders,
                competitor_coin_holders: req.body.competitor_coin_holders,
                people_coin_holders: req.body.people_coin_holders,
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
        const event = await EventData.findOne({ _id: req.body.event_id });
        res.status(200).json(await event.deleteOne())
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get all teams of an event
router.get('/allteams/:event_id', async (req, res) => {
    const { event_id } = req.params;
    try {
        res.status(200).json(await TeamData.find({ event_id: event_id }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get team info
router.get('/teaminfo/:event_id/:team_leader_wallet_id', async (req, res) => {
    const { event_id, team_leader_wallet_id } = req.params;
    try {
        res.status(200).json(await TeamData.findOne({ event_id: event_id, team_leader_wallet_id: team_leader_wallet_id }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get all submissions
router.get('/allsubmissions/:event_id', async (req, res) => {
    const { event_id } = req.params;
    try {
        res.status(200).json(await SubmissionData.find({ event_id: event_id }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get a submission
router.get('/submissioninfo/:event_id/:team_leader_wallet_id', async (req, res) => {
    const { event_id, team_leader_wallet_id } = req.params;
    try {
        res.status(200).json(await SubmissionData.findOne({ event_id: event_id, team_leader_wallet_id: team_leader_wallet_id }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get all visible profiles
router.get('/allvisibleprofiles/:event_id', async (req, res) => {
    const { event_id } = req.params;
    const event = await EventData.findOne({ _id: event_id });
    try {
        res.status(200).json(await UserData.find({ events: event, visible_profile: true }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;