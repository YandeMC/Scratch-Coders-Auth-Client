import NextLink from 'next/link';
import { Badge, Box, Button, Card, Container, Flex, Link, Text, Heading, Popover, PopoverTrigger, PopoverContent, PopoverClose, Separator, Skeleton, styled, keyframes } from '@design-system';
import ThemeToggle from '../ThemeToggle';
import Logo from '../Logo';
import Banner from '../Banner';
import { useAccounts } from '@hooks';
import { ChevronDownIcon, ExclamationTriangleIcon, OpenInNewWindowIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import fetchJson from '@/utils/fetch-json';
import { useRouter } from 'next/router';

const questionnaireBannerAnimation = keyframes({
    '0%': { transform: 'translate(-40%, 5%) rotate(15deg)' },
    '100%': { transform: 'translate(-10%, -75%) rotate(15deg)' },
});

const AccountCard = styled(Card, {
    backgroundColor: '$loContrast',
    p: '$4',
});

const AccountExpiry = styled(Box, {
    position: 'absolute',
    right: '-1em',
    top: '-0.5em',
    borderRadius: '$pill',
    backgroundColor: '$danger10',
    color: '$loContrast',
    textTransform: 'uppercase',
    fontWeight: '$bold',
    fontSize: '$2',
    px: '$2',
});

const STCensorNotice = styled(Flex, {
    p: '$4',
    backgroundColor: '$danger10',
    color: '$loContrast',
});



function Header({ withSecondaryHeader, secondaryHeader }) {
    const { accounts, error: accountError, mutateAccounts } = useAccounts();
    const router = useRouter();
    const [redirect, setRedirect] = useState(undefined);

    useEffect(() => {
        if (router.isReady) {
            setRedirect(router.query?.redirect || undefined);
        }
    }, [router.isReady, router.query]);

    const [removeAccountButtonStates, setRemoveAccountButtonStates] = useState({});

    async function removeAccount(username = null) {
        if (username === null) {
            // Remove all one click sign in accounts with the given token
            await fetch('/api/auth/accounts', { method: 'DELETE', headers: { Authorization: accounts.token } });
            setRemoveAccountButtonStates({});
        } else {
            await fetch(`/api/auth/accounts?username=${username}`, { method: 'DELETE', headers: { Authorization: accounts.token } });
        }

        mutateAccounts();
    }

    return (
        <>
            {/* <STCensorNotice>
                <Flex>
                    <Box css={{ flex: 'none' }}>
                        <ExclamationTriangleIcon width={64} height={64} />
                    </Box>
                    <Flex direction="column" css={{ ml: '$4' }}>
                        <Heading as="h3" size="2" css={{ color: 'inherit', mb: '$2' }}>
                            Important notice
                        </Heading>
                        <Text css={{ color: 'inherit' }}>
                            <strong>
                                The Scratch Team blocked Scratch Auth once again (July 25<sup>th</sup> 2022) for absolutely no justifiable reason.
                            </strong>
                            <br />
                            <br />
                            <strong>
                                Currently, authenticating with cloud data or by commenting on the authentication project is NOT possible. Instead, choose the option to sign in by commenting on your
                                profile!
                            </strong>
                        </Text>
                        <Flex css={{ mt: '$4' }}>
                            <Button as="a" href="https://scratch.mit.edu/discuss/topic/576248/?page=31#post-6484826" target="_blank" variant="danger">
                                Learn more
                                <Box css={{ ml: '$1' }}>
                                    <OpenInNewWindowIcon width={24} height={24} />
                                </Box>
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </STCensorNotice> */}
            {/*<Banner identifier="scratch-game-jam-questionnaire" CustomContent={QuestionnaireBanner} expiry={14 * 24 * 60 * 60 * 1000} />*/}
            <Flex
                as="header"
                css={{
                    py: '$4',
                    px: '$4',
                    jc: 'space-between',
                    position: 'relative',
                    zIndex: '1',
                }}
            >
                <NextLink href="/" passHref>
                    <Box
                        as="a"
                        css={{
                            color: '$hiContrast',
                            display: 'inline-flex',
                            '&:focus': {
                                boxShadow: 'none',
                            },
                        }}
                    >
                        <span
                            style={{
                                position: 'absolute',
                                width: 1,
                                height: 1,
                                padding: 0,
                                margin: -1,
                                overflow: 'hidden',
                                clip: 'rect(0, 0, 0, 0)',
                                whiteSpace: 'nowrap',
                                border: 0,
                            }}
                        >
                            Scratch Auth homepage
                        </span>
                        <Logo />
                    </Box>
                </NextLink>
                <Flex as="nav" css={{ ai: 'center' }}>
                  
                    <Link
                        href="https://github.com/YandeMC/Scratch-Coders-Auth-Client"
                        variant="subtle"
                        css={{
                            mr: '$5',
                            display: 'none',
                            '@bp1': { display: 'block' },
                            '@bp2': { mr: '$7' },
                        }}
                    >
                        <Text>GitHub</Text>
                    </Link>
                    {accounts === undefined && !accountError && (
                        <Link variant="subtle" css={{ mr: '$5', '@bp2': { mr: '$7' }, width: '7.5rem' }}>
                            {<Skeleton />}
                        </Link>
                    )}
                    {accountError && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Link variant="danger" css={{ mr: '$5', '@bp2': { mr: '$7' } }}>
                                    <Text as="div" bold css={{ display: 'inline-flex' }}>
                                        <Box css={{ mr: '$1' }}>
                                            <ExclamationTriangleIcon width={18} height={18} />
                                        </Box>
                                        Ka-boom!
                                        <Box css={{ ml: '$1' }}>
                                            <ChevronDownIcon width={18} height={18} />
                                        </Box>
                                    </Text>
                                </Link>
                            </PopoverTrigger>
                            <PopoverContent variant="danger" sideOffset={10} align="end" css={{ width: '20rem' }}>
                                <Heading as="h2" css={{ mb: '$1', color: '$danger11' }}>
                                    Well, this is awkward!
                                </Heading>
                                <Text>
                                    We couldn't retrieve your accounts because something broke on our end. Keep an eye on our{' '}
                                    <Link target="_blank" href="https://stats.uptimerobot.com/4Ggz4Fzo2O" css={{ display: 'inline-flex' }}>
                                        status page <OpenInNewWindowIcon width={15} height={15} />
                                    </Link>{' '}
                                    for further information.
                                </Text>
                            </PopoverContent>
                        </Popover>
                    )}
                    {accounts?.isIdentified === false && !accountError && (
                        <NextLink href={redirect === undefined ? '/auth?newOneClickSignInAccount=true' : `/auth?newOneClickSignInAccount=true&redirect=${redirect}`} passHref>
                            <Link variant="subtle" css={{ mr: '$5', '@bp2': { mr: '$7' } }}>
                                <Text>Add a Scratch account</Text>
                            </Link>
                        </NextLink>
                    )}
                    {accounts?.isIdentified === true && !accountError && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Link variant="subtle" css={{ mr: '$5', '@bp2': { mr: '$7' } }}>
                                    <Text as="div" css={{ display: 'inline-flex' }}>
                                        Accounts
                                        <Box css={{ ml: '$1' }}>
                                            <ChevronDownIcon width={18} height={18} />
                                        </Box>
                                    </Text>
                                </Link>
                            </PopoverTrigger>
                            <PopoverContent sideOffset={10} align="end" css={{ width: '20rem' }}>
                                <Flex direction="column" css={{ gap: 10 }}>
                                    <Flex align="center" justify="between">
                                        <Heading as="h2" css={{ mb: '$1', color: '$neutral11' }}>
                                            Your Accounts
                                        </Heading>
                                    </Flex>
                                    {accounts.accounts !== null &&
                                        accounts.accounts.map((account, index) => (
                                            <AccountCard key={index}>
                                                {new Date(account.updated) < new Date(Date.now() - 27 * 24 * 60 * 60 * 1000) === true && <AccountExpiry>Expires soon</AccountExpiry>}
                                                <Flex justify="between">
                                                    <Heading as="h3">{account.username}</Heading>
                                                    <Button
                                                        variant="neutral"
                                                        size="small"
                                                        disabled={removeAccountButtonStates?.[account.username] === true ? true : false}
                                                        onClick={() => {
                                                            setRemoveAccountButtonStates({ ...removeAccountButtonStates, [account.username]: true });
                                                            removeAccount(account.username);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Flex>
                                                <Text css={{ lineHeight: 1.3 }}>Last used to sign in at {new Date(account.updated).toLocaleString()}</Text>
                                            </AccountCard>
                                        ))}
                                    <NextLink href={redirect === undefined ? '/auth?newOneClickSignInAccount=true' : `/auth?newOneClickSignInAccount=true&redirect=${redirect}`} passHref>
                                        <Button as="a" variant="accent" css={{ display: 'inline-flex', justifyContent: 'center', width: '100%', my: '$1' }}>
                                            Add a new account
                                        </Button>
                                    </NextLink>
                                    {accounts.accounts.length > 0 && (
                                        <Button
                                            variant="danger"
                                            css={{ display: 'inline-flex', justifyContent: 'center', width: '100%', mb: '$1' }}
                                            disabled={removeAccountButtonStates?._removeAllButtonDisabled === true ? true : false}
                                            onClick={() => {
                                                setRemoveAccountButtonStates({ ...removeAccountButtonStates, _removeAllButtonDisabled: true });
                                                removeAccount();
                                            }}
                                        >
                                            Remove all
                                        </Button>
                                    )}
                                    <Text css={{ lineHeight: 1.3, mb: '$2' }}>One click sign in accounts expire after 30 days of not being used. Using one to sign in will reset its expiry date.</Text>
                                    <Link
                                        as="a"
                                        href="/api/auth/forgetMe"
                                        variant="subtle"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await fetch('/api/auth/forgetMe', { method: 'POST' });
                                            router.push('/');
                                            mutateAccounts();
                                        }}
                                    >
                                        <Text>Forget this device (clears session cookie and one click sign in accounts)</Text>
                                    </Link>
                                </Flex>
                            </PopoverContent>
                        </Popover>
                    )}
                    <ThemeToggle />
                </Flex>
            </Flex>
            {withSecondaryHeader === true && (
                <Container size="3">
                    <Flex
                        css={{
                            px: '$4',
                            py: '$2',
                            backgroundColor: '$card2',
                            borderRadius: '$4',
                            border: '2px solid $colors$neutral6',
                        }}
                    >
                        <Heading as="h2">{secondaryHeader?.title}</Heading>
                        {secondaryHeader.subtitle && (
                            <>
                                <Separator orientation="vertical" css={{ mx: '$2', '&[data-orientation=vertical]': { width: '2px', height: 'initial' } }} />
                                <Heading as="h3" css={{ fontWeight: 400 }}>
                                    {secondaryHeader?.subtitle}
                                </Heading>
                            </>
                        )}
                        {secondaryHeader.controls && secondaryHeader.controls}
                    </Flex>
                </Container>
            )}
        </>
    );
}

export default Header;
