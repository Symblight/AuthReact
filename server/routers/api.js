import express from 'express'

const router = express.Router();

router.get('/dashboard', (req, res, next)=>{
    res.status(200).json({
        message: "You're authorized to see this secret message."
    });
});

export default router;