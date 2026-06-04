import z from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url().default('https://fakestoreapi.com'),
  NEXT_PUBLIC_BASE_URL: z.url().default('http://localhost:3000'),
  NEXT_PUBLIC_MAX_RETRIES: z.number().default(3),
  NEXT_PUBLIC_RETRY_DELAY: z.number().default(1000),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  // biome-ignore lint/suspicious/noConsole: valida error envs.
  console.error('Invalid environment variables', z.flattenError(parsedEnv.error).fieldErrors)
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
