// pages/api/auth/access-token.ts

import { error, success } from '@/utils/response';
import { getAccessToken } from '@auth0/nextjs-auth0';

export async function GET() {
    try {
        const token = await getAccessToken();
        return success(200, { accessToken: token })
    } catch (err) {
        console.error('Error getting access token:', err);
        return error(500, { error: 'Failed to get access token' });
    }
  }