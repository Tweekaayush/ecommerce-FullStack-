import React from 'react'
import { Accordion, AccordionActions, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = ({qna}) => {
  return (
    <div className="faqs">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
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