import { expo } from '@better-auth/expo';
import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

export const auth = betterAuth({
    trustedOrigins: [
        'codo://',
        ...(process.env.NODE_ENV === 'development'
            ? [
                  'exp://', // Trust all Expo URLs (prefix matching)
                  'exp://**', // Trust all Expo URLs (wildcard matching)
                  'exp://192.168.*.*:*/**', // Trust 192.168.x.x IP range with any port and path
              ]
            : []),
    ],
    plugins: [expo()],
    emailAndPassword: {
        enabled: true,
    },
    database: new Pool({
        max: 1,
        connectionString: process.env.DATABASE_POOLER,
    }),
});
