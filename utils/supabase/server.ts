import { Database } from '@/types/supabase';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
    const cookieStore = cookies()

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    const value = cookieStore.get(name)?.value;
                    console.log(`Getting cookie: ${name} = ${value}`);
                    return value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    console.log(`Setting cookie: ${name} = ${value}`);
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        console.error(`Error setting cookie: ${name}`, error);
                    }
                },
                remove(name: string, options: CookieOptions) {
                    console.log(`Removing cookie: ${name}`);
                    try {
                        cookieStore.set({ name, value: '', ...options });
                    } catch (error) {
                        console.error(`Error removing cookie: ${name}`, error);
                    }
                },
            },
        }
    )
}

