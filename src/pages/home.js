import { Header, Container } from "semantic-ui-react";


export default () => (
    <div>
        <Header as="h1">
            This's a Localstack GUI for
            <a href="https://docs.aws.amazon.com/sns/latest/dg/welcome.html" target="_blank"> SNS</a> and
            <a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html" target="_blank"> SQS</a>.
        </Header>
        <Container>
            <h3>This's project example what using api rest of application Localstack.</h3>
            <h2>Overview</h2>
            <p>LocalStack 💻 is a cloud service emulator that runs in a single container on your laptop or in your CI environment. With LocalStack, you can run your AWS applications or Lambdas entirely on your local machine without connecting to a remote cloud provider! Whether you are testing complex CDK applications or Terraform configurations, or just beginning to learn about AWS services, LocalStack helps speed up and simplify your testing and development workflow.</p>
        </Container>
    </div>
)