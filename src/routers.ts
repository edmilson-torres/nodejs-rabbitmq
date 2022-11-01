import { Router } from 'express';
import topicExchangePublisher from './workers/producers/order-producer';
import topicExchangePublisherSamples from './workers/producers/order-producer-samples';
const router = Router();

router.get('/publish/samples', async (req, res) => {
    const result = await topicExchangePublisherSamples();
    if (result instanceof Error) {
        return res.status(500).json({ error: result.message });
    }
    res.json({ message: 'messages samples sent' });
});

router.post('/publish', async (req, res) => {
    const dataType = req.body.data.type;
    if (dataType === 'online' || dataType === 'offline') {
        const result = await topicExchangePublisher(req.body);
        if (result instanceof Error) {
            return res.status(500).json({ error: result.message });
        }
        return res.json({ message: 'message sent' });
    }
    return res
        .status(400)
        .json({ error: 'data type must be online or offline' });
});

export default router;
