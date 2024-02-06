import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const TitleAndMetaTags = ({
    url = 'https://oauth.fly.dev',
    pathname,
    title = 'Scratch Coders OAuth',
    description = 'description',
}) => {
    const router = useRouter();

    const image = `${url}/icon.png`;
    const path = pathname || router.pathname;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width" />

            <link rel="alternate icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

            <meta property="og:url" content={`${url}${path}`} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta name="twitter:site" content="@stitchesjs" />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    );
};

export default TitleAndMetaTags;
