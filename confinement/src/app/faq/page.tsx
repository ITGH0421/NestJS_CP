'use client';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import faqData, { FAQSection } from '@/data/faqData';

export default function FAQPage() {
  const faqSections = useMemo(() => (
    faqData.map((section: FAQSection, i: number) => (
      <Box key={i} sx={{ mb: 6 }}>
        <Typography
          variant="h6"
          sx={{ color: '#f27b96', fontWeight: 600, mb: 2, textTransform: 'uppercase' }}
        >
          {section.category}
        </Typography>

        {section.items.map((faq, idx) => (
          <Accordion
            key={idx}
            disableGutters
            elevation={0}
            sx={{
              border: '1px solid #f2f2f2',
              borderRadius: 2,
              mb: 1,
              '&:before': { display: 'none' },
              backgroundColor: '#FACAD5',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#f27b96' }} />}>
              <Typography sx={{ fontWeight: 700, color: '#6D6E71' }}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {faq.answer.split('\n').map((line, index) => (
                <Typography key={index} paragraph sx={{ color: '#f27b96', fontSize: '0.875rem' }}>
                  {line}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

        {i < faqData.length - 1 && <Divider sx={{ my: 4 }} />}
      </Box>
    ))
  ), []);

  return (
    <>
      <Header />
      <Box sx={{ py: 8, px: { xs: 2, md: 30 }, backgroundColor: '#fff' }}>
        <Typography variant="h4" sx={{ color: '#f27b96', fontWeight: 700, mb: 4, textAlign: 'center' }}>
          Frequently Asked Questions
        </Typography>
        {faqSections}
      </Box>
      <Footer />
    </>
  );
}
function wait(arg0: number) {
  throw new Error('Function not implemented.');
}

