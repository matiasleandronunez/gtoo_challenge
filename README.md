## Setup
### Adding an .env file
First and foremost, add at the root of the solution and .env file filling in the values for the follwing keys:

```bash
BASE_URL=
BASE_API_URL=
USERNAME=
PASSWORD=
RUN_WITH_UI=false
```
Note that anything other than 'true' will run the UI tests in headless mode.

### Running in Docker

You only need to have [docker](https://docs.docker.com/engine/install/) installed in your system

Build the image 
```bash
docker build . -t gtoo_challenge
```

Run docker and bash into 
```bash
docker run -i -t gtoo_challenge /bin/bash
```

Run tests with command
```bash
npm run test
```

### Running from local env
Install packages 
```bash
npm install
```

Install playwright
```bash
npx playwright install --with-deps
```

Run tests with command
```bash
npm run test
```