import NextLink from 'next/link';
import { Box, Container, Grid, Heading, Text, Link, Flex, Separator /*VisuallyHidden*/ } from '@design-system';
import Logo from '../Logo';
import { OpenInNewWindowIcon } from '@radix-ui/react-icons';

const Footer = () => {
    return (
        <Box css={{ pb: '$8' }}>
         
            <Container size={2} css={{ maxWidth: '1090px' }}>
                <Grid
                    css={{
                        '& ul, & li': { listStyle: 'none', margin: 0, padding: 0 },
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        gap: '$6',
                        '@bp2': {
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '$3',
                        },
                    }}
                >
                    <Flex css={{ flexDirection: null, alignItems: 'center', '@bp2': { flexDirection: 'column', alignItems: 'start' } }}>
                        <NextLink href="/" passHref>
                            <Link css={{ color: '$hiContrast', ':focus': { boxShadow: 'none' } }}>
                                {/* <VisuallyHidden>Modulz homepage</VisuallyHidden> */}
                                <Logo aria-hidden />
                            </Link>
                        </NextLink>

                      
                    </Flex>
                   
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
