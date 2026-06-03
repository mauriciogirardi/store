import z from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url().default('https://fakestoreapi.com'),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  // biome-ignore lint/suspicious/noConsole: valida error envs.
  console.error('Invalid environment variables', z.flattenError(parsedEnv.error).fieldErrors)
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
