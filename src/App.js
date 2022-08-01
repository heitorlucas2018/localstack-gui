import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import TableExamplePagination from './components/tableExamplePagination';
import MenuExampleVerticalPointing from "./components/menuExampleVerticalPointing";
import Home from "./pages/home";
import Painel from "./pages/painel";
import SqsQueues from "./pages/sqsQueues";
import Api from "./services/localStackRequestService";
import SqsMessagesForQueue from './pages/sqsMessagesForQueue';

function App() {
  const [statusSns, setStatusSns] = useState('available');
  const [statusSqs, setStatusSqs] = useState('available');

  useEffect(() => {
    handleRequestStatusServices();
  }, [])

  const handleRequestStatusServices = () => {
    Api.getServices()
    .then(({data:{services:{sns, sqs}}}) => {
      setStatusSns(sns);
      setStatusSqs(sqs);
    })
    .catch(error => console.error(error))
  }

  return (
    <Router>
      <Container className="container-container">
        <Grid textAlign="left" columns='equal'>
          <Grid.Row>
            <Grid.Column width={4}>
              <MenuExampleVerticalPointing statusSns={statusSns} statusSqs={statusSqs} />
            </Grid.Column>
            <Grid.Column >
              <Container as={'div'}>
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/home' element={<Home />} />
                  <Route exact path='/SNS_PAINEL' element={<Painel />} />
                  <Route exact path='/SNS_TOPICS' element={<TableExamplePagination headerContent={'Topics'}  dataTable={[]}/>} />
                  <Route exact path='/SNS_SUBSCRIPTION' element={<TableExamplePagination headerContent={'Subscription'} dataTable={[]} />} />
                  <Route exact path='/SQS_QUEUE' element={<SqsQueues headerContent={'SQS Queues'}/>} />
                  <Route exact path='/SQS_QUEUE/MESSAGES' element={<SqsMessagesForQueue headerContent={'SQS Queues Messages'}/>} />
                </Routes>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;
