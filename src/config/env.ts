export default {
    port: Number(process.env.PORT || 3000),
    queueUrl: String(process.env.QUEUE_URL)
};
