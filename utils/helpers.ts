export const getURL = (path: string = '') => {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ??
        process?.env?.NEXT_PUBLIC_VERCEL_URL ??
        'http://localhost:3000';

    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Remove trailing slash if present
    url = url.replace(/\/$/, '');
    
    // Remove leading slash from path if present
    path = path.replace(/^\//, '');

    // Combine URL and path
    return `${url}/${path}`;
};
