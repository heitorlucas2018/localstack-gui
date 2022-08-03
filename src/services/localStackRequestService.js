import axios from "axios";

const LOCALSTACK_SERVICE_REST = 'http://localhost:4566/health';
const URL = 'http://localhost:4566/';
const ATTRIBUTES_QUEUES_REST = '?Action=GetQueueAttributes&AttributeName.1=CreatedTimestamp&AttributeName.2=ApproximateNumberOfMessages&AttributeName.3=QueueArn';

export default class Api {
    static async getServices() {
        return await axios.get(LOCALSTACK_SERVICE_REST)
    }

    /**
     * 
     * @returns 
     * @see https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ListDeadLetterSourceQueues.html
     */
    static async getListQueues() {
        return await axios.get(`${URL}?Action=ListQueues`)
    }

    static async getListTopics() {
        return await axios.get(`${URL}?Action=ListTopics`)
    }

    /**
     * 
     * @returns 
     * @see https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_GetQueueAttributes.html
     */
    static async getQueuesAttributes(nameQueue) {
        return await axios.get(nameQueue + ATTRIBUTES_QUEUES_REST)
    }

    /**
     * 
     * @returns 
     * @see https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_GetQueueAttributes.html
     */
    static async getQueueMessages(nameQueue, maxNumberOfMessages=10) {
        if(maxNumberOfMessages<10) {
            maxNumberOfMessages=maxNumberOfMessages*10;
        }
        const queryReceiveMessage = `?Action=ReceiveMessage&MaxNumberOfMessages=${maxNumberOfMessages}&WaitTimeSeconds=30&AttributeName=All&Version=2012-11-05&AUTHPARAMS`;
        return await axios.get(nameQueue + queryReceiveMessage)
    }

}