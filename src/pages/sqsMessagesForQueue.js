import React, { useState, useEffect, useInsertionEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { Container, HeaderContent, Select, Segment, Icon, Button, Loader, Input } from "semantic-ui-react";
import TableMessagesPagination from '../components/tableMessagesPagination';
import SqsService from '../services/SqsService';

const SqsMessagesForQueue = ({ headerContent }) => {
  const location = useLocation();
  const [listMessages, setListMessages] = useState([]);
  const [listQueues, setListQueues] = useState([]);
  const [listSeachMessages, setListSeachMessages] = useState([]);
  const [queueSelected, setQueueSelect] = useState();
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    function handleComponente() {
      console.log(location)
      if(location.state !== null) {
        const queueSelected = location.state.listQueues.filter((v, i) => (v.isSelect===true))[0]
        setListQueues(location.state.listQueues.map(({value},i) => value))
        setQueueSelect(queueSelected.value)
        handlerRequestApiMessagesForQueue(queueSelected.value)
        console.log(queueSelected, location.state.listQueues);  
      } else   {
        handleRequestSqsApi().then(data => {
          console.log("data reequest queue", data)
            if(data.length > 0) {
              setListQueues(data)
              setQueueSelect(data[0]);
              handlerRequestApiMessagesForQueue(data[0])
            }
          });        
      }
    }
    handleComponente()
  }, [location])

  const handleRequestSqsApi = async () => {
    return await SqsService.getQueues();
  }

  const handlerRequestApiMessagesForQueue = async (queueUri) => {
    setLoader(true)
    console.log("Request messages", queueUri);
    SqsService.getQueueMessages(queueUri)
      .then(data => {
          setListMessages(data)
      })
      .finally(() => {
        setLoader(false)
      });
  }

  const handleSelectionQueue = async (queue) => {
    handlerRequestApiMessagesForQueue(queue).finally(() => { setQueueSelect(queue)})
  }

  const handleSeachValue = (value) => {
    const listFltred = listMessages.filter((v, i) => v.Body.match(value))
    if(listFltred) {
      setListSeachMessages(listFltred)
    }
  }

  return (
    <Container>
      <HeaderContent as={'h3'}>{headerContent}</HeaderContent>
      <Container>
        <Select
          placeholder='Select queue'
          options={listQueues.map((value, i) => ({ key: i, value: value, text: value }))}
          value={queueSelected}
          onChange={(event, prop) => handleSelectionQueue(prop.value)} />
      </Container>
      <Segment>
        <Container>
          <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between' }}>
            <div>
              <Input onChange={(evt, props) => handleSeachValue(props.value)} />
              <Loader active={isLoading} />
            </div>
            <Button onClick={() => handlerRequestApiMessagesForQueue(queueSelected)}>
              <Button.Content visible>
                <Icon name='sync' />
              </Button.Content>
            </Button>
          </div>
          <TableMessagesPagination listMessages={(listSeachMessages.length > 0 ? listSeachMessages : listMessages)} queueNameUri={queueSelected} />
        </Container>
      </Segment>
    </Container>
  )
}

export default SqsMessagesForQueue;