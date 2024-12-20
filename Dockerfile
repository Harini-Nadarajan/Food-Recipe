# Step 1: Use an official Node.js runtime as a parent image
FROM node:16-alpine AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React application
RUN npm run build

# Step 7: Use an Nginx image to serve the app
FROM nginx:stable-alpine

# Step 8: Copy the build output to the Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
