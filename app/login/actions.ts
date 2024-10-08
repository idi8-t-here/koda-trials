'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Provider } from '@supabase/supabase-js'
import { getURL } from '@/utils/helpers'
import { z } from 'zod'

// Define the schema for form validation
const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
})

export async function emailLogin(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/todos')
}

export async function signups(formData: FormData) {
  const supabase = createClient()

  // Parse and validate the form data
  const result = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!result.success) {
    // If validation fails, redirect with error messages
    const errorMessage = result.error.issues.map(issue => issue.message).join(', ')
    return redirect(`/login?message=${encodeURIComponent(errorMessage)}`)
  }

  const { email, password } = result.data

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    return redirect('/login?message=Error signing up')
  }

  revalidatePath('/')
  redirect('/login?message=Check your email to confirm your account')
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect('/login?message=No provider selected')
  }

  const supabase = createClient()
  const redirectUrl = getURL("/auth/callback")
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    }
  })

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  return redirect(data.url)
}
