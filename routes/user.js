const router = require('express').Router();

let SubmissionData = require('../models/submissionModel');

let UserData = require('../models/userModel');

let EventData = require('../models/eventModel');

require('dotenv').config();

//Signup
router.post('/newuser', async (req, res) => {
    try {
        const newuser = new UserData({
            user_wallet_id: req.body.user_wallet_id,
            user_type: req.body.user_type,
        });
        res.status(200).json(await newuser.save())
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get user profile
router.get('/userinfo', async (req, res) => {
    try {
        res.status(200).json(await UserData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id, user_wallet_id: req.body.user_wallet_id }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//add submission
router.post('/addsubmission', async (req, res) => {
    //check if the user is registered before they make a submission
    try {
        const event = await EventData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id });
        if (event.teams.includes(req.body.team_leader_wallet_id)) {
            const newsubmission = new SubmissionData({
                organizer_wallet_id: req.body.organizer_wallet_id,
                event_name: req.body.event_name,
                team_name: req.body.team_name,
                team_leader_wallet_id: req.body.team_leader_wallet_id,
                teammates_wallet_ids: req.body.teammates_wallet_ids,
                team_logo: req.body.team_logo,
                live_link: req.body.live_link,
                repo_link: req.body.repo_link,
                video_link: req.body.video_link,
                doc_link: req.body.doc_link,
                pics: req.body.pics,
                comments: req.body.comments,
                judge_coin: req.body.judge_coin,
                competitor_coin: req.body.competitor_coin,
                people_coin: req.body.people_coin,
            });
            res.status(200).json(await newsubmission.save())
        }
        else {
            res.status(200).json("Enter valid team lead wallet id")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})


//update submission
router.patch('/updatesubmission', async (req, res) => {
    try {
        const submission = await SubmissionData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id, team_leader_wallet_id: req.body.team_leader_wallet_id });
        res.status(200).json(await submission.updateOne({
            team_logo: req.body.team_logo,
            live_link: req.body.live_link,
            repo_link: req.body.repo_link,
            video_link: req.body.video_link,
            doc_link: req.body.doc_link,
            pics: req.body.pics
        }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//vote && comment for a submission
router.patch('/votencmt', async (req, res) => {
    try {
        const submission = await SubmissionData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id, team_leader_wallet_id: req.body.team_leader_wallet_id });
        let updatedcmt = submission.comments;
        updatedcmt.push(req.body.comments);
        res.status(200).json(await submission.updateOne({
            comments: updatedcmt,
            judge_coin: submission.judge_coin + req.body.judge_coin,
            competitor_coin: submission.competitor_coin + req.body.competitor_coin,
            people_coin: submission.people_coin + req.body.people_coin,
        }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//adding users to judge coin holders list         
router.patch('/addjudge', async (req, res) => {
    try {
        const event = await EventData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id });
        let newjudge_coin_holders = event.judge_coin_holders;
        newjudge_coin_holders.push(req.body.newjudge);
        res.status(200).json(await event.updateOne({
            judge_coin_holders: newjudge_coin_holders
        }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//adding users to competitor coin holders list
router.patch('/addcompetitor', async (req, res) => {
    try {
        const event = await EventData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id });
        let newcompetitor_coin_holders = event.competitor_coin_holders;
        newcompetitor_coin_holders.push(req.body.newcompetitor);
        res.status(200).json(await event.updateOne({
            competitor_coin_holders: newcompetitor_coin_holders
        }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//adding users to people coin holders list 
router.patch('/addpeople', async (req, res) => {
    try {
        const event = await EventData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id });
        let newpeople_coin_holders = event.people_coin_holders;
        newpeople_coin_holders.push(req.body.newpeople);
        res.status(200).json(await event.updateOne({
            people_coin_holders: newpeople_coin_holders
        }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//creating a visible profile
router.patch('/makevisible', async (req, res) => {
    try {
        const curruser = await UserData.findOne({ event_name: req.body.event_name, organizer_wallet_id: req.body.organizer_wallet_id, user_wallet_id: req.body.user_wallet_id });
        res.status(200).json(await curruser.updateOne({
            need_team: req.body.need_team,
            visible_profile: req.body.visible_profile,
            user_name: req.body.user_name,
            institute: req.body.institute,
            mobileno: req.body.mobileno,
            email: req.body.email,
            linkedin_url: req.body.linkedin_url,
            github_url: req.body.github_url,
            portfolio_url: req.body.portfolio_url,
            bio: req.body.bio,
            skills: req.body.skills,
            ideas: req.body.ideas,
        }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;