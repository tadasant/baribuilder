import { fromEvent } from 'graphcool-lib';

// const pat = '__PAT__';
const projectId = 'cjlzqvawt1ib00107g3nfr04i';

const event = {
  context: {
    graphcool: {
      projectId,
      // include a PAT if you need full read/write access on the server-side
      // pat,
    }
  }
};

const api = fromEvent(event).api('simple/v1');

const run = () => {
  const query = `
    query {
      allIngredientTypes {
        id
        name
        synonyms
      }
    }
  `;
  api
    .request(query)
    .then(data => console.log(data))
};

run();
