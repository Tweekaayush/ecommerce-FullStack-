import { Step, Typography, Stepper, StepLabel, colors } from '@mui/material'
import React, { Fragment } from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import ReceiptIcon from '@mui/icons-material/Receipt';
import "./CheckoutSteps.css"

const CheckoutSteps = ({activeSteps}) => {

    const steps = [
        {
            label: <Typography>Billing Details</Typography>,
            icon: <ReceiptIcon/>
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon/>
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon/>
        },
    ]

    const stepStyles ={
        boxSizing: "border-box",
        backgroundColor: "rgb(75, 1, 224)",
        paddingTop: "1rem",
        color: "white"
    }

  return (
    <Fragment>
        <Stepper alternativeLabel activeSteps={activeSteps} style={stepStyles}>
            {
                steps.map((item, i)=>(
                    <Step key={i}
                        active={activeSteps === i?true:false}
                        completed={activeSteps >=i?true:false}
                    >
                        <StepLabel style={{
                            color: activeSteps >=i? "rgb(0, 162, 255)": "white"
                        }}
                         icon={item.icon}>{item.label}</StepLabel>
                    </Step>
                ))
            }
        </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps