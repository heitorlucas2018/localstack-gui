import React from 'react'
import { Icon, Step } from 'semantic-ui-react'

const RouteStep = ({steps=[]}) => {


  return (
    <Step.Group size='mini'>
      {steps.length > 0 && steps.map((step, i) => (
        step && ( i < (steps.length-1) ? 
        <Step key={i} disabled>
          <Step.Content>
            <Step.Title>{step}</Step.Title>
          </Step.Content>
        </Step> : 
        <Step key={i} active>
        <Step.Content>
          <Step.Title>{step}</Step.Title>
        </Step.Content>
      </Step>)
      ))}
    </Step.Group>
  )
}

export default RouteStep
