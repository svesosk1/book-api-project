FROM node:18-bullseye

WORKDIR /app

COPY package*.json ./

# Install Chromium + Chromedriver and set permissions
RUN apt-get update \
    && apt-get install -y chromium chromium-driver \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && chmod +x /usr/bin/chromedriver

# Install all node modules including ts-node and wdio-chromedriver-service
RUN npm ci

# Copy the rest of the project
COPY . .

# Ensure tsconfig.json is present
COPY tsconfig.json .

# Set base URL
ENV BASE_URL=https://fakerestapi.azurewebsites.net
ENV IN_DOCKER=true

# This is critical: tell WDIO to use ts-node to compile config
CMD ["npx", "wdio", "run", "wdio.conf.ts"]
