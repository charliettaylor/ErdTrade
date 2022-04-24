import express from 'express';
import eldenRingController from './eldenRingApi';

const router = express.Router();

router.get('/items', async (req, res) => {
    let apiController = new eldenRingController();
    let result = await apiController.searchItem(req.query.name as string);
    res.send(result);
});

router.get('/items/:id', async (req, res) => {
    let apiController = new eldenRingController();
    let result = await apiController.getItemById(req.params.id);
    res.send(result);
});

export default router;