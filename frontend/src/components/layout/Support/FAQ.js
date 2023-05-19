import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./FAQ.css"

const FAQ = ({qna}) => {


  const style = {
    backgroundColor:"Aqua",
    color:"white"
  }

  return (
    <div className="faqs">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            classes={style}
          >
            <Typography>
                {qna.q}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
                {qna.a}
            </Typography>
          </AccordionDetails>
        </Accordion>
    </div>
  )
}

export default FAQ