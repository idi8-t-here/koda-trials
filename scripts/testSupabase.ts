// scripts/testSupabase.mts
import { createClient } from '../utils/supabase/server';

async function testSignUp() {
    const supabase = createClient();
    
    const { data, error } = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'password123',
    });

    if (error) {
        console.error('SignUp Error:', error.message);
    } else {
        console.log('SignUp Successful', data);
    }
}

testSignUp();

