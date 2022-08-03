# Localstack
## How configuration SNS/SQS
 https://medium.com/@anchan.ashwithabg95/using-localstack-sns-and-sqs-for-devbox-testing-fa09de5e3bbb

## O que é ARN?
    https://docs.aws.amazon.com/pt_br/general/latest/gr/aws-arns-and-namespaces.html

## Configure AWS CLI local
To mors information this's [documentation AWS](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config)

```sh
    aws configure --profile default
    aws configure set aws_access_key_id "dummy" --profile test-profile
    aws configure set aws_secret_access_key "dummy" --profile test-profile
    aws configure set region "us-east-1" --profile test-profile
    aws configure set output "table" --profile test-profile
``` 

## EndPoints rest for status application
To mors information this's documentation
- https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_Operations.html
- https://docs.aws.amazon.com/sdk-for-go/api/service/sqs/

Some exemples:
- http://localhost:4566/health
- http://localhost:4566/000000000000/sample-queue?Action=ReceiveMessage

## Commands line
 - List topics 
    https://docs.aws.amazon.com/cli/latest/userguide/cli-services-sns.html
    https://docs.aws.amazon.com/sns/latest/api/API_GetTopicAttributes.html
    http://localhost:4566/000000000000/?Action=ListTopics
    ```sh
        aws --endpoint-url=http://localhost:4566 sns list-topics
        aws sns create-topic --name my-topic
    ```
- List queues 
    ```sh
    aws --endpoint-url=http://localhost:4566 sqs list-queue
    ```
- Create queues 
    ```sh
    aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name sample-queue
    aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name sample-queue --attributes "FifoQueue=true"
    ```    
- Send message
    ```sh
    aws --endpoint-url=http://localhost:4566 sqs send-message --queue-url http://localhost:4566/000000000000/sample-queue --message-body '{"MD5OfMessageBody": "098f6bcd4621d373cade4e832627b4f6","MessageId": "74861aab-05f8-0a75-ae20-74d109b7a76e"}'
    ```
    - Message JSON example 
        ```json
        {
                "MD5OfMessageBody": "098f6bcd4621d373cade4e832627b4f6",
                "MessageId": "74861aab-05f8-0a75-ae20-74d109b7a76e",
                "Header": [
                    {
                        "x-type": "type-teste"
                    }
                ],
                "Payload": {
                    "nome": "teste",
                    "date": "2022-07-15T23:32:17.322Z",
                    "message": {
                        "MD5OfMessageBody": "098f6bcd4621d373cade4e832627b4f6",
                        "MessageId": "74861aab-05f8-0a75-ae20-74d109b7a76e"
                    }
                }
            }
        ```
