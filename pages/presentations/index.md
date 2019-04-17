---
title: Introduction
path: presentations/index
---

import {Box, Heading, Text} from '@primer/components'
import HeroImage from './HeroImage.svg'


export const Hero = () => (
  <Box bg="black">
    <Box maxWidth={1012} p={6} mx="auto" mb={3}>
      <Box mt={4} mb={4}>
        <Heading color="blue.4" fontSize={7} pb={3} m={0}>
          Primer Presentations
        </Heading>
        <Text as="div" color="blue.2" fontSize={2} mb={4}>
          Last updated: March 22, 2019
        </Text>
        <Box maxWidth={1012}><HeroImage/></Box>
      </Box>
    </Box>
  </Box>
)

Welcome to the Primer Presentations design system! Primer Presentations is the presentation design system for GitHub. This repo contains the presentation themes, guidelines, and assets needed in order to create a presentation that represents the GitHub brand.

**Get the template:** [Keynote](https://primer.style/presentations/docs/presentation-formats#keynote) | [Google Slides](https://primer.style/presentations/docs/presentation-formats#google-slides) | [Figma](https://primer.style/presentations/docs/presentation-formats#figma)

### Basic Principles
- **You're a storyteller.** When you give a presentation, you're not just sharing data and analysis, you're also telling a story with a unique and important message.
- **Slides aren't everything.** Your slides are meant to support your presentation. But don't depend on them to the point where you're cramming every idea in your brain into text on the slide. When it comes to adding text, remember that less is more. If you find yourself with too much text, ask yourself, "What is my key message?"
- **Be concise.** Keep your content short and direct. Too much text creates a conflict for the audience as they are stuck between reading what's on the slide and listening to what you have to say. Instead of paragraphs of text, use a few bullet points to supplement your message.
