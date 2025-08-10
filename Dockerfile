FROM node:20-bookworm-slim
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Generate Prisma client for NextAuth adapter
RUN npx prisma generate --schema=prisma/schema.prisma

# 🔧 Build Next.js so .next exists at runtime
RUN npm run build

EXPOSE 3000
CMD ["npm","run","start"]
