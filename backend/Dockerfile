# Backend Go (Gin) — deploy no Railway
FROM golang:1.23-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o server ./cmd/server

# Pasta para uploads (ephemeral no Railway; em prod use bucket)
RUN mkdir -p uploads

EXPOSE 8080

CMD ["./server"]
