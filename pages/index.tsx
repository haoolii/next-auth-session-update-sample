import { GetServerSidePropsContext } from 'next';
import { encode } from 'next-auth/jwt';
import { getSession, useSession, signOut } from 'next-auth/react';
import { serialize } from "cookie";

const sessionCookie = process.env.NEXTAUTH_URL?.startsWith("https://")
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    console.log('NEXTAUTH_SECRET', process.env.NEXTAUTH_SECRET);

    const session = await getSession(ctx);

    if (session) {
        // session.user.access_token = 'SERVER_SIDE_PROPS_UPDATED_ACCESS_TOKEN';

        const newSessionToken = await encode({
            secret: process.env.NEXTAUTH_SECRET as string,
            token: {
                access_token: 'SERVER_SIDE_PROPS_UPDATED_ACCESS_TOKEN2'
            },
            maxAge: 1 * 24 * 60 * 60, // 30 days, or get the previous token's exp
        })

        const cookie = serialize(sessionCookie, newSessionToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        console.log("cookie", cookie);
        console.log("res object", ctx.res);

        ctx.res.setHeader("Set-Cookie", cookie);

    }

    return {
        props: {
            sessionProps: session
        }
    }
}
export default function Page({ sessionProps }: any) {
    const { data: session, update } = useSession();

    const updateSession = async () => {
        if (!session) return;

        session.user.access_token = 'UPDATED_ACCESS_TOKEN';
        await update(session)
    }

    return (
        <div>
            <button onClick={() => updateSession()}>Update Session</button>
            <button onClick={() => console.log({ session })}>Log Session</button>
            <button onClick={() => console.log({ sessionProps })}>Log SessionProps</button>
        </div>
    );
}
