# WikipedAI

## Like Wikipedia, but AI-generated

I don't have anything more to say about it.

## Running in Docker

```shell
docker run -itd -p 3000:3000 -e MONGO_URI=mongodb://somewhere:27017 -e OLLAMA_URI=http://somewhere:9000 -e URL_BASE=http://0.0.0.0:3000 1p22geo/wikipedai

```

## Running it yourself

### Create .env.local

```bash
MONGO_URI=mongodb://somewhere:27017
OLLAMA_URI=http://somewhere:9000
URL_BASE=http://localhost:3000
```

### Run commands

```shell
yarn install
yarn build
yarn start
```
