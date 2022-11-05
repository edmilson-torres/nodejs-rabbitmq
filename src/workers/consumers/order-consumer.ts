import { connect } from 'amqplib';
import env from '../../config/env';

export default async function orderConsumer() {
    try {
        const queueUrl = env.queueUrl;
        const exchange = 'orders-topic';
        const exchangeType = 'topic';
        const routingKey = '*.order';
        const options = {};
        const queue = 'all-orders';

        const connection = await connect(queueUrl);
        const channel = await connection.createChannel();
        await channel.assertExchange(exchange, exchangeType, options);
        await channel.assertQueue(queue, options);
        await channel.bindQueue(queue, exchange, routingKey);

        channel.consume(queue, (data) => {
            if (data !== null) {
                const message = JSON.parse(data.content.toString());
                console.log(queue, 'persisting: ', message);
                channel.ack(data, false);
            }
        });

        console.log('orderConsumer running');
    } catch (error) {
        console.error(error);
    }
}

orderConsumer();
