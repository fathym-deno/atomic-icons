FROM denoland/deno:1.33.2

ARG VERSION
ENV DENO_DEPLOYMENT_ID=${VERSION}

WORKDIR /app

COPY . .
RUN deno cache main.ts

EXPOSE 8000

CMD ["run", "-A", "main.ts"]