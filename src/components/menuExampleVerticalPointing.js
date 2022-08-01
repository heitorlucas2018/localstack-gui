import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Menu, Container, Label } from 'semantic-ui-react'

const MenuExampleVerticalPointing = ({statusSns, statusSqs}) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
    navigate(name)
  }

  return (
    <Container>
      <Menu pointing vertical className=''>
        <Menu.Header>
          <div className='header-menu'>
            <img src="/logo.svg" alt="" />
            <h5>
              <i>Version: {process.env.REACT_APP_VERSION}</i><br/>
                <i>Region: us-east-1</i> <br/>
                Services: 
                <ul style={{listStyle: 'none'}}>
                  <li> SNS: <i>{statusSns}</i></li>
                  <li> SQS: <i>{statusSqs}</i> </li>
                </ul>    
            </h5>
          </div>

        </Menu.Header>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />
        <Menu.Item active={activeItem === 'SNS_SUBSCRIPTION' || activeItem === 'SNS_TOPICS'}>
          SNS
          <Menu pointing secondary vertical>
            <Menu.Item
              name='SNS_TOPICS'
              active={activeItem === 'SNS_TOPICS'}
              onClick={handleItemClick}>
              Topics <Label color='teal'>1</Label>
            </Menu.Item>
            <Menu.Item
              name='SNS_SUBSCRIPTION'
              active={activeItem === 'SNS_SUBSCRIPTION'}
              onClick={handleItemClick}>
              Subscription <Label color='teal'>1</Label>
            </Menu.Item>
          </Menu>

        </Menu.Item>
        <Menu.Item  active={activeItem === 'SQS_QUEUE' || activeItem === '/SQS_QUEUE/MESSAGES'}> SQS 
            <Menu pointing secondary vertical>
                <Menu.Item
                  name='SQS_QUEUE'
                  active={activeItem === 'SQS_QUEUE'}
                  onClick={handleItemClick}>
                  Queues
                </Menu.Item>
                <Menu.Item
                  name='/SQS_QUEUE/MESSAGES'
                  active={activeItem === '/SQS_QUEUE/MESSAGES'}
                  onClick={handleItemClick}>
                  Receive messages
                </Menu.Item>
              </Menu>
        </Menu.Item>
      </Menu>
    </Container>
  )
}

export default MenuExampleVerticalPointing;