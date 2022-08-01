import React, { useState, useEffect } from 'react'
import { Icon, Menu, Table, Segment } from 'semantic-ui-react'

const TableMessagesPagination = ({ listMessages }) => {
  const [dataForTable, setDataForTable] = useState([])
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    separeteTableForPage(listMessages)
  }, [listMessages])

  function separeteTableForPage(dataTable) {
    if (dataTable) {
      const dataArray = [];
      for (let i = 0; i < dataTable.length; i += 10) {
        dataArray.push(dataTable.slice(i, i + 10))
      }
      setDataForTable(dataArray)
    }
  }

  const nextPage = () => {
    if (currentPage < (dataForTable.length - 1)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const downPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={3}>Id</Table.HeaderCell>
          <Table.HeaderCell width={5}>Body</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body style={{ maxHeight: '50em', textOverflow: 'clip', overflow: 'auto' }}>
        {
          dataForTable.length > 0 && dataForTable[currentPage].map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>{item.MessageId}</Table.Cell>
              <Table.Cell>
                <Segment style={{ maxHeight: '10em', textOverflow: 'clip', overflow: 'auto' }}>
                  {JSON.stringify(item.Body)}
                </Segment>
              </Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='2'>
            <Menu floated='right' pagination>
              <Menu.Item as='a' icon onClick={downPage}>
                <Icon name='chevron left' />
              </Menu.Item>
              {
                dataForTable.map((v, i) =>
                  <Menu.Item
                    key={i}
                    as='a'
                    onClick={() => setCurrentPage(i)} active={currentPage === i}>
                    {i + 1}
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
  )
}

export default TableMessagesPagination;