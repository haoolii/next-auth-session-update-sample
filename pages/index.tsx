import { getSession, useSession, signOut } from 'next-auth/react';

export async function getServerSideProps(ctx: any) {
    return {
        props: {
            sessionProps: await getSession(ctx)
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
