import React from 'react'
import heroImage from '../../../hero-image.svg'
import {Container} from '@primer/gatsby-theme-doctocat'

export default function Hero() {
  return (
    <Container>
      Primer Presentations
      <img src={heroImage} alt="Primer Presentations hero image" />
    </Container>
  )
}
