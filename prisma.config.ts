import 'dotenv/config'
import { defineConfig, env } from '@prisma/config'

export default defineConfig({
  schema: './prisma/schema.prisma',

  datasource: {
    // Use the DIRECT connection (port 5432) for CLI tools (migrate, introspect, etc.)
    // This bypasses PgBouncer, which is required for migrations to work on Supabase
    url: env('DIRECT_URL'),
  },
})