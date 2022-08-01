import React,{ useState, useEffect } from 'react'
import { Icon, Container, HeaderContent, Menu, Table } from 'semantic-ui-react'
import SqsService from '../services/SqsService';

const TableExamplePagination = ({ headerContent, dataTable }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [queuesList, setQueueList] = useState([]);
  const data = DATA_TABLE;

  useEffect(() => {
    SqsService.getQueueAttributes(dataTable).then(data => {
      setQueueList(data)
    });
  }, [dataTable])

  const nextPage = () => {
    if(currentPage < (data.numPages-1)) {
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
  
  const handleItemsToPage = (numPage) => {
    return DATA_TABLE[numPage];
  }
  
  return (
    <Container>
      <HeaderContent as={'h3'}>{headerContent}</HeaderContent>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>Name</Table.HeaderCell>
            <Table.HeaderCell width={2}>Region</Table.HeaderCell>
            <Table.HeaderCell width={4}>Date Created</Table.HeaderCell>
            <Table.HeaderCell width={2}>Num Of Msg</Table.HeaderCell>
            <Table.HeaderCell width={5}>Queue Arn</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            queuesList.map((item, index) => (
              <Table.Row key={index}>
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
            <Table.HeaderCell colSpan='5'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon onClick={downPage}>
                  <Icon name='chevron left' />
                </Menu.Item>
                {
                  data.data.map((v,i) => 
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

export default TableExamplePagination;

const DATA_TABLE = {
  data: [
    [
      {nome: "Nome exeplo",  QueueArn: "arn:aws:sqs:us-east-1:000000000000:sample-queue", CreatedTimestamp: "1657561119", ApproximateNumberOfMessages: 0},
      {nome: "Nome exeplo",  QueueArn: "arn:aws:sqs:us-east-1:000000000000:sample-queue", CreatedTimestamp: "1657561119", ApproximateNumberOfMessages: 0},
    ],
  ]
}