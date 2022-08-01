import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, HeaderContent, Segment } from "semantic-ui-react";
import TableSqsPagination from "../components/tableSqsPagination";
import SqsService from '../services/SqsService';

const SqsQueues = ({ headerContent }) => {
  const navigate = useNavigate();
  const [listQueues, setListQueues] = useState([]);

  useEffect(() => {
    handleRequestSqsApi()
  }, [])

  const handleRequestSqsApi = async () => {
    await SqsService.getQueues().then(data => {
      if (data.length > 0) {
        setListQueues(data)
      }
    });
  }

  const handleSelectionQueue = async (queue) => {
    if (queue) {
      const list = listQueues.map((v, i ) => ({id: i, value: v, isSelect: (v === queue)}))
      navigate("/SQS_QUEUE/MESSAGES", { replace: true, state: { listQueues: list }})
    }
  }

  return (
    <Container>
      <HeaderContent as={'h3'}>{headerContent}</HeaderContent>
      <Segment>
        <TableSqsPagination dataTable={listQueues} onSelectTableRow={handleSelectionQueue} />
      </Segment>
    </Container>
  )
}

export default SqsQueues;