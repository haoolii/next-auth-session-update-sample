import { getSession, signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    
    const session = await getSession(ctx);
    return {
        props: {
            sessionProps: session
        }
    }
}
export default function LoginPage({ sessionProps }: any) {

    const { data: session } = useSession();

    return (
        <div>
            <button onClick={() => console.log('session', session)}>Log Session</button>
            <button onClick={() => console.log('sessionProps', sessionProps)}>Log SessionProps</button>
        </div>
    );
}
