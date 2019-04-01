import React from 'react'
import App, {Container} from 'next/app'
import {MDXProvider} from '@mdx-js/tag'
import {withMDXLive} from 'mdx-live'
import documents from '../searchIndex'
import Head from 'next/head'
import {pageMap} from '../meta'
import {
  MarkdownHeading,
  SideNav,
  ResponsiveJumpNav,
  RouteMatch,
  Header,
  JumpNav,
  Section,
  Link,
  NavLink,
  Outline,
  config
} from '@primer/blueprints'
import {BaseStyles, BorderBox, Box, Flex, theme} from '@primer/components'

const CONTENT_MAX_WIDTH = 1012

export const H1 = props => <MarkdownHeading fontSize={5} fontWeight="light" {...props} />
export const H2 = props => <MarkdownHeading as="h2" fontSize={4} fontWeight="light" {...props} />
export const H3 = props => <MarkdownHeading as="h3" fontSize={3} fontWeight="light" {...props} />
export const H4 = props => <MarkdownHeading as="h4" fontSize={2} fontWeight="light" {...props} />
export const H5 = props => <MarkdownHeading as="h5" fontSize={1} fontWeight="light" {...props} />

function getComponents(page = {}) {
  const {outline: getOutline = () => []} = page
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    a: Link,
    code: withMDXLive('pre'),
    p: ({children, ...rest}) => {
      if (children === '{:toc}') {
        return <Outline outline={getOutline()} {...rest} />
      } else {
        return <p {...rest}>{children}</p>
      }
    },
    // "unwrap" <pre> elements around <code> blocks
    pre: props => props.children,
  }
}

const requirePage = require.context('.', true, /\.(js|md)x?$/)

export default class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let initialProps = {}

    if (Component.getInitialProps) {
      initialProps = await Component.getInitialProps(ctx)
    }

    return {initialProps}
  }

  render() {
    // strip the trailing slash
    const pathname = this.props.router.pathname.replace(/\/$/, '')
    const {Component, initialProps} = this.props

    const page = pageMap.get(pathname) || {}
    const {meta = {}, requirePath} = page
    const Hero = requirePath ? requirePage(requirePath).Hero : null

    return (
      <BaseStyles fontSize={2} style={{fontFamily: theme.fonts.normal}}>
        <Container>
          <Head>
            <title>Primer Presentation{meta.title ? ` / ${meta.title}` : null}</title>
          </Head>
          <Header
            documents={documents}
            root="https://primer.style"
            subfolder="presentations"
            title="Primer"
            subtitle="Presentations"
          >
            <JumpNav />
          </Header>
          <Flex
            flexDirection={['column', 'column', 'column', 'row-reverse']}
            alignContent="stretch"
            justifyContent="space-between"
          >
            <Box width={['auto', 'auto', '100%']}>
              {Hero ? <Hero /> : null}
              <Box color="gray.9" maxWidth={['auto', 'auto', 'auto', CONTENT_MAX_WIDTH]} px={6} mx="auto" my={6}>
                <div className="markdown-body">
                  {!meta.hero && meta.title ? <MarkdownHeading>{meta.title}</MarkdownHeading> : null}
                  <MDXProvider components={getComponents(page)}>
                    <Component {...initialProps} />
                  </MDXProvider>
                  {config.production ? null : (
                    <details>
                      <summary>Metadata</summary>
                      <pre>{JSON.stringify(meta, null, 2)}</pre>
                    </details>
                  )}
                </div>
              </Box>
            </Box>
            <BorderBox
              width={['100%', '100%', '100%', 256]}
              minWidth={256}
              bg="gray.0"
              borderColor="gray.2"
              borderRadius={0}
              border={0}
              borderRight={1}
              borderTop={[1, 1, 0, 0]}
            >
              <Box display={['block', 'block', 'block', 'none']}>
                <ResponsiveJumpNav />
              </Box>
              <SideNav>
                <Section href="/presentations">Docs</Section>
              </SideNav>
            </BorderBox>
          </Flex>
        </Container>
      </BaseStyles>
    )
  }
}
