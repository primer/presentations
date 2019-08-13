// src/@primer/gatsby-theme-doctocat/components/hero.js
import {Box, Heading, Text} from '@primer/components'
import React from 'react'
import heroImage from '../../../hero-image.svg'
import {Container} from '@primer/gatsby-theme-doctocat'

export default function Hero() {
  return (
    <Box bg="black" p={5}>
      <Container>
        <Heading color="blue.4" fontSize={7} pb={3} m={0}>
          Primer Presentations
        </Heading>
        <Text as="div" color="blue.2" fontSize={2} mb={4}>
          Last updated: March 22, 2019
        </Text>
        <img src={heroImage} alt="Primer Presentations hero" />
      </Container>
    </Box>
  )
}
