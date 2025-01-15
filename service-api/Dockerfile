FROM docker.io/node:20-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile --prod

# Production image, copy all the files and run next
FROM docker.io/node:20-alpine as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . ./
CMD node dist/index.js