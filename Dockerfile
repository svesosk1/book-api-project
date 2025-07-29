
# Use official Node.js LTS image (Debian-based for Chrome compatibility)
FROM node:18-bullseye


WORKDIR /app


COPY package*.json ./


# Install Chromium and Chromedriver (works on both ARM64 and AMD64)
RUN apt-get update \
    && apt-get install -y chromium chromium-driver \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN npm ci


COPY . .




ENV BASE_URL=https://fakerestapi.azurewebsites.net


CMD ["npm", "run", "book-store-test"]
