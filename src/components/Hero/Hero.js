import React from 'react';
import NextLink from 'next/link';
import { Button, Link, Section, Container, Box, Heading, Grid, Flex, Text, Paragraph } from '@design-system';

function Hero() {
    return (
        <Section
            size={{
                '@initial': '2',
                '@bp1': '3',
            }}
            css={{
                pt: '$3',
                '@bp2': {
                    pt: '$6',
                },
            }}
        >
            <Container size="3">
                <Heading
                    size="4"
                    css={{
                        mb: '$3',
                        '@initial': {
                            pr: 100,
                        },
                        '@bp2': {
                            ta: 'center',
                            px: 180,
                        },
                        '@bp3': {
                            px: 200,
                        },
                    }}
                >
                    Scratch Coders{' '}
                    <Box
                        as="span"
                        css={{
                            color: '$accent10',
                        }}
                    >
                        Oauth
                    </Box>
                </Heading>
                <Paragraph
                    size="2"
                    css={{
                        mb: '$6',
                        '@bp2': {
                            mx: 230,
                            ta: 'center',
                            mb: '$7',
                        },
                    }}
                >
                    Verify your scratch account to access the rest of our server!
                </Paragraph>
                <Flex css={{ '@bp2': { jc: 'center', my: '$7' } }}>
                    
                    <NextLink href="discord.gg/WF8PdPbNyD" passHref>
                        <Button as="a" variant="accent">
                           Join The Server
                        </Button>
                    </NextLink>
                </Flex>
            </Container>


          
        </Section>
    );
}

export default Hero;
