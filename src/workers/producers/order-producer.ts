import { connect } from 'amqplib';
import env from '../../config/env';

interface RequestBodyProtocol {
    data: { type: 'online' | 'offline' };
}

export default async function topicExchangePublisher(
    request: RequestBodyProtocol
) {
    try {
        const rabbitmqUrl = env.queueUrl;
        const connection = await connect(rabbitmqUrl);
        const exchange = 'orders-topic';
        const exchangeType = 'topic';
        const options = {};
        const channel = await connection.createChannel();
        await channel.assertExchange(exchange, exchangeType, options);

        const sendMessage = <U>(message: U, routingKey: string): void => {
            channel.publish(
                exchange,
                routingKey,
                Buffer.from(JSON.stringify(message)),
                options
            );
        };

        if (request.data.type === 'online') {
            sendMessage(request, 'pdf.order');
        } else if (request.data.type === 'offline') {
            sendMessage(request, 'online.order');
        }
    } catch (error) {
        return error;
    }
}
