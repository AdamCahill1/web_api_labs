import Favourite from './favouriteModel';
import asyncHandler from 'express-async-handler';
import express from 'express';


const router = express.Router();

router.get('/', async (req, res) => {
    const favourites = await Favourite.find();
    res.status(200).json(favourites);
});


router.post('/', asyncHandler(async (req, res) => {
    try {
        await Favourite.create(req.body);
        res.status(201).json({ success: true, msg: 'Favourite successfully added.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

export default router;