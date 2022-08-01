import React,{ useState, useEffect } from 'react'
import { Icon, Container, Radio, Menu, Table, Button, Input } from 'semantic-ui-react'
import SqsService from '../services/SqsService';

const TableSqsPagination = ({ dataTable, onSelectTableRow }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [queuesList, setQueueList] = useState([]);
  const [queuesListSeach, setQueueListSeach] = useState([]);
  
  useEffect(() => {
    handlerRequestApi(dataTable)
  }, [dataTable])

  async function handlerRequestApi(values) {
    SqsService.getQueueAttributes(values).then(data => {
      console.log("Resulto the request queues", data)
      setQueueList(data)
    });
  }

  function callSelectTableRow(queueUrl) {
    if(typeof onSelectTableRow === 'function') {
      onSelectTableRow(queueUrl)
    }
  }

  const handleSeachValue = (value) => {
    const listFltred = queuesList.filter((v, i) => v.QueueArn.match(value))
    if(listFltred) {
      setQueueListSeach(listFltred)
    }
  }

  const nextPage = () => {
    if(currentPage < (queuesList.length-1)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const convertDate = (date) => {
    return new Date((date-0) * 1000).toISOString()
  }

  const downPage = () => {
    if(currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <Container>
      <div style={{display: 'flex', flexFlow: 'row', justifyContent: 'space-between'}}>
        <Input onChange={(evt, props) => handleSeachValue(props.value)} />
        <Button onClick={() => handlerRequestApi(dataTable)}>
          <Button.Content visible>
            <Icon name='sync' />
          </Button.Content>
        </Button>
      </div>
    
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}></Table.HeaderCell>
            <Table.HeaderCell width={3}>Name</Table.HeaderCell>
            <Table.HeaderCell width={2}>Region</Table.HeaderCell>
            <Table.HeaderCell width={4}>Date Created</Table.HeaderCell>
            <Table.HeaderCell width={2}>Num Of Msg</Table.HeaderCell>
            <Table.HeaderCell width={5}>Queue Arn</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {(queuesListSeach.length > 0 ? queuesListSeach : queuesList).map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell><Radio onClick={() => callSelectTableRow(item.queueUrl)} /></Table.Cell>
                <Table.Cell>{item.QueueArn.split(':')[5]}</Table.Cell>
                <Table.Cell>{item.QueueArn.split(':')[3]}</Table.Cell>
                <Table.Cell>{convertDate(item.CreatedTimestamp)}</Table.Cell>
                <Table.Cell>{item.ApproximateNumberOfMessages}</Table.Cell>
                <Table.Cell>{item.QueueArn}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='6'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon onClick={downPage}>
                  <Icon name='chevron left' />
                </Menu.Item>
                {
                  queuesList.map((v,i) => 
                    <Menu.Item 
                      key={i} 
                      as='a' 
                      onClick={() => setCurrentPage(i)} active={currentPage === i }>
                        {i+1}
                    </Menu.Item>
                  )
                }
                <Menu.Item as='a' icon onClick={nextPage}>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Container>
  )
}

export default TableSqsPagination;