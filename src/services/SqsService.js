import SqsXmlComponent from "./components/SqsXmlComponent";
import Api from "./localStackRequestService";

export default class SqsService {
    static isRunning = false;
    static dataQueues = [];

    static async getQueues() {
        const queuesList  = await Api.getListQueues()
            .then(({data}) => (SqsXmlComponent.builder().xmlParse(data).getQueueList()));
        return queuesList
    }

    static async getQueueAttributes(queuesList=[]) {
        const queues = [];
        for (const queue of queuesList) {
            const attributes = await Api.getQueuesAttributes(queue)
                .then(({data}) => SqsXmlComponent.builder().xmlParse(data).getQueueAttributes(queue));
            queues.push(attributes);
        }
        SqsService.dataQueues = queues;
        return queues;
    }

    static async getQueueMessages(queueUrl) {
        if(!queueUrl || SqsService.isRunning ) { return null}
        SqsService.isRunning = true;
        const { ApproximateNumberOfMessages } = SqsService.getDataQueue(queueUrl);
        const numOfMessages = ApproximateNumberOfMessages === undefined ? ApproximateNumberOfMessages : 50;
        return await Api.getQueueMessages(queueUrl, numOfMessages)
            .then(({data}) => SqsXmlComponent.builder().xmlParse(data).getQueueMessages())
            .finally(() => {SqsService.isRunning = false});
    }

    static getDataQueue(queueUrl) {
        if(!SqsService.dataQueues) {
            return {}
        }
        return SqsService.dataQueues.filter((v, i) => (v.queueUrl === queueUrl))[0];
    }
}