FROM bee-travels/node-base:v1 as release

WORKDIR /services/{{.ServiceNamePill}}

COPY src src
COPY package.json .

EXPOSE {{.Port}}

CMD ["yarn", "node", "-r", "esm", "./src/bin/www.js"]