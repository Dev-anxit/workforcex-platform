FROM node:20-bullseye-slim

# Install Python and venv
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

WORKDIR /app

# Copy everything
COPY . .

# Setup Python Virtual Environment and install dependencies
RUN cd intelligence && python3 -m venv venv && ./venv/bin/pip install pandas scikit-learn numpy

# Build Frontend
RUN cd frontend && npm install && npm run build

# Setup Backend
RUN cd backend && npm install

# Set environment to production
ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

# Start the server
CMD ["node", "backend/server.js"]
