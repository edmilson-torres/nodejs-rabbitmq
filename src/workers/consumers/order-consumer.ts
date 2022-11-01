import { connect } from 'amqplib';

export default async function orderConsumer() {
    try {
        const connection = await connect('amqp://admin:123456@localhost');
        const exchange = 'orders-topic';
        const exchangeType = 'topic';
        const routingKey = '*.order';
        const options = {};
        const queue = 'all-orders';
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
    } catch (error) {
        console.error(error);
    }
}
orderConsumer();
console.log('orderConsumer running');
