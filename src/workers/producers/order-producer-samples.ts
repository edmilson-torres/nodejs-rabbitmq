import { connect } from 'amqplib';
import env from '../../config/env';
import orders from '../orders-data-sample.json';

async function topicExchangePublisherSamples() {
    try {
        const rabbitmqUrl = env.queueUrl;
        const connection = await connect(rabbitmqUrl);
        const exchange = 'orders-topic';
        const exchangeType = 'topic';
        const options = {};
        const channel = await connection.createChannel();
        await channel.assertExchange(exchange, exchangeType, options);

        const sendMessage = <T>(message: T, routingKey: string): void => {
            channel.publish(
                exchange,
                routingKey,
                Buffer.from(JSON.stringify(message)),
                options
            );
        };

        orders.forEach((item) => {
            if (item.data.type === 'online') {
                sendMessage(item, 'pdf.order');
            } else {
                sendMessage(item, '*.order');
            }
        });
    } catch (error) {
        return error;
    }
}

export default topicExchangePublisherSamples;
