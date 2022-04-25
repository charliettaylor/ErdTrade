import express from 'express';
import eldenRingController from './eldenRingApi';

const router = express.Router();

let apiController = new eldenRingController();

router.get('/armors', async (req, res) => {
    let result = await apiController.searchArmors(req.query.name as string);
    if(result.error != undefined){
        return res.status(400).send(result);
    }
    return res.send(result);
});

router.get('/armors/:id', async (req, res) => {
    let result = await apiController.getArmorsById(req.params.id);
    if(result.error != undefined){
        return res.status(400).send(result);
    }
    return res.send(result);
});

router.get('/items', async (req, res) => {
    let result = await apiController.searchItem(req.query.name as string);
    if(result.error != undefined){
        return res.status(400).send(result);
    }
    return res.send(result);
});

router.get('/items/:id', async (req, res) => {
    let result = await apiController.getItemById(req.params.id);
    if(result.error != undefined){
        return res.status(400).send(result);
    }
    return res.send(result);
});

router.get('/shields', async (req, res) => {
    let result = await apiController.searchShields(req.query.name as string);
    if(result.error != undefined){
        return res.status(400).send(result);
    }
    return res.send(result);
});

router.get('/shields/:id', async (req, res) => {
    let result = await apiController.getShieldsById(req.params.id);
    if(result.error != undefined){
        return res.status(400).send(result);
    }
    return res.send(result);
});

router.get('/weapons', async (req, res) => {
    let result = await apiController.searchWeapons(req.query.name as string);
    if(result.error != undefined){
        return res.status(400).send(result);
    }
    return res.send(result);
});

router.get('/weapons/:id', async (req, res) => {
    let result = await apiController.getWeaponsById(req.params.id);
    if(result.error != undefined){
        return res.status(400).send(result);
    }
    return res.send(result);
});


export default router;