# Bakalářská práce (2022/23) - Student workshop on scientific computing

## Lokální nasazení

- potřebné nástroje

  - [Node.js](https://nodejs.org/en) + [NPM](https://www.npmjs.com/)
  - [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)
    - Docker Compose musí být ve verzi V2 (CLI plugin nebo desktop)

- instalace závislostí

  - `npm i`

- vytvořit soubor `.env` a nastavit lokální proměnné (uvedené hodnoty jsou pouze příklad)

  ```env
  # odpovídá URL a portu aplikace (v rámci kontejneru)
  NEXTAUTH_URL="http://localhost:3000"
  # hodnotu lze v terminálu vygenerovat například příkazem `openssl rand -base64 32`
  NEXTAUTH_SECRET="VkoQHEqNMCkM11oCWdUdEe3NhqaQ9vRirw9bF/LCjvw="
  POSTGRES_VERSION=15
  POSTGRES_USER=admin
  POSTGRES_PASSWORD=pwd
  POSTGRES_DB=db
  ```

- pokud má být aplikace nasazena na platformě [Digital Ocean](https://www.digitalocean.com/), je navíc pro funkční revalidaci statických stránek nutné definovat proměnnou `PLATFORM=DO`

- vytvoření a spuštění Docker kontejnerů (sestavení aplikace může chvíli trvat)

  - `docker compose up`

- produkční verze aplikace je nyní dostupná na adrese [localhost:3000](http://localhost:3000/)
