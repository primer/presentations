import {Box, Heading, ThemeProvider, Text} from '@primer/react'
import React from 'react'
import {Container} from '@primer/gatsby-theme-doctocat'
import heroImage from '../../../hero-image.svg'

export default function Hero() {
  return (
    <ThemeProvider colorMode="night" nightScheme="dark_dimmed">
      <Box bg="canvas.default" py={6}>
        <Container>
          <Heading as="h1" sx={{color: 'accent.fg', fontSize: 7, m: 0}}>
            Primer Presentations
          </Heading>
          <Text as="p" sx={{mt: 0, mb: 4, color: 'fg.default', fontSize: 4}}>
            Presentation system for Primer
          </Text>
          <img src={heroImage} alt="Interface Guidelines hero" width="100%" />
        </Container>
      </Box>
    </ThemeProvider>
  )
}
