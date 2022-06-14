const router = require('express').Router();

let SubmissionData = require('../models/submissionModel');

let UserData = require('../models/userModel');

let EventData = require('../models/eventModel');

let TeamData = require('../models/teamModel');

require('dotenv').config();

//Signup
router.post('/newuser', async (req, res) => {
    try {
        if (await UserData.findOne({ user_wallet_id: req.body.user_wallet_id })) {
            res.status(200).json("Account exists")
        }
        else {
            const newuser = new UserData({
                user_wallet_id: req.body.user_wallet_id
            });
            res.status(200).json(await newuser.save())
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get user profile
router.get('/userinfo', async (req, res) => {
    try {
        res.status(200).json(await UserData.findOne({ user_wallet_id: req.body.user_wallet_id }));
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//join an event 
router.post('/joinevent', async (req, res) => {
    //check if the user is already in the event 
    try {
        const user = await UserData.findOne({ user_wallet_id: req.body.user_wallet_id });
        if (user.events.includes(req.body.event_id)) {
            res.status(200).send("Already in the event")
        }
        else {
            let updatedevents = user.events;
            updatedevents.push(req.body.event_id)
            res.status(200).json(await user.updateOne({ events: updatedevents }));
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//add a team 
router.post('/addteam', async (req, res) => {
    //check if the team is registered before
    try {
        const event = await EventData.findOne({ _id: req.body.event_id });
        if (event.teams.includes(req.body.team_leader_wallet_id)) {
            res.status(200).send("Team already exists")
        }
        else {
            let updatedteams = event.teams;
            updatedteams.push(req.body.team_leader_wallet_id)
            await event.updateOne({ teams: updatedteams });
            const newteam = new TeamData({
                event_id: req.body.event_id,
                team_name: req.body.team_name,
                team_leader_wallet_id: req.body.team_leader_wallet_id,
                teammates_wallet_ids: req.body.teammates_wallet_ids,
            });
            res.status(200).json(await newteam.save())
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//add submission
router.post('/addsubmission', async (req, res) => {
    //check if the user is registered before they make a submission
    try {
        const event = await EventData.findOne({ _id: req.body.event_id });
        if (event.teams.includes(req.body.team_leader_wallet_id)) {
            const newsubmission = new SubmissionData({
                event_id: req.body.event_id,
                team_name: req.body.team_name,
                team_leader_wallet_id: req.body.team_leader_wallet_id,
                teammates_wallet_ids: req.body.teammates_wallet_ids,
                team_logo: req.body.team_logo,
                proj_name: req.body.proj_name,
                proj_disc: req.body.proj_disc,
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
            res.status(200).send("Enter valid team lead wallet id")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})


//update submission
router.patch('/updatesubmission', async (req, res) => {
    try {
        const submission = await SubmissionData.findOne({ event_id: req.body.event_id, team_leader_wallet_id: req.body.team_leader_wallet_id });
        res.status(200).json(await submission.updateOne({
            proj_name: req.body.proj_name,
            proj_disc: req.body.proj_disc,
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
        const submission = await SubmissionData.findOne({ event_id: req.body.event_id, team_leader_wallet_id: req.body.team_leader_wallet_id });
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
        const event = await EventData.findOne({ _id: req.body.event_id });
        let newjudge_coin_holders = event.judge_coin_holders;
        let updatedjudges = event.teams;
        updatedjudges.push(req.body.newjudge);
        newjudge_coin_holders.push(req.body.newjudge_wallet_id);
        res.status(200).json(await event.updateOne({
            judges: updatedjudges,
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
        const event = await EventData.findOne({ _id: req.body.event_id });
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
        const event = await EventData.findOne({ _id: req.body.event_id });
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
        const curruser = await UserData.findOne({ event_id: req.body.event_id, user_wallet_id: req.body.user_wallet_id });
        res.status(200).json(await curruser.updateOne({
            need_team: req.body.need_team,
            visible_profile: true,
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