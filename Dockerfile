FROM node:21-alpine as builder

# Set the working directory in the Docker container
WORKDIR /app

# Install Yarn at the specified version
RUN yarn set version stable

# Step 2: Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Step 3: Install dependencies
# This layer is cached as long as package.json and yarn.lock don't change
RUN yarn

# Step 4: Copy the rest of your app's source code
COPY . .

# Step 5: Build your Next.js application
RUN yarn build

# Step 6: Set up the production image
FROM node:21-alpine as runner
WORKDIR /app

# Install Yarn for running the app
RUN yarn set version stable

RUN yarn workspaces focus --production -A

# Copy over the built artifacts from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json /app/yarn.lock ./

# Step 7: Expose the port Next.js runs on
EXPOSE 3000

# Step 8: Command to run the app
CMD ["yarn", "start"]

