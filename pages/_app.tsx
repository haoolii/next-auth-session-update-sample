import { SessionProvider } from "next-auth/react"

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: any) {
    return (
        <SessionProvider session={session}>
            <h1>HOOOO</h1>
            <Component {...pageProps} />
        </SessionProvider>
    )
}