import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
const authOptions = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const user = {
                    id: '1',
                    name: 'TEST',
                    email: 'TEST@example.com',
                    access_token: 'FIRST_ACCESS_TOKEN'
                };

                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt(props) {
            const { user, token, trigger, session } = props
            if (trigger === 'update') {
                return { ...token, ...session.user };
            }
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
});

export default authOptions;