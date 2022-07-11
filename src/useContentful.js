import { createClient } from 'contentful';

const useContentful = () => {
  const client = createClient({
    space: 're181t9ltost',
    accessToken: 'Q6oImuk50FR2y9hU_7xKHsIeEA8scfLgYy_7-Ex0h60', // for dev
    // accessToken: '_oXEAIKIG9D-fUh2RMx_ZqRs3wkvHntNPvTixEOHmgI', // for production "Delivery"
    host: 'preview.contentful.com', // if use "preview" token
    // host: 'cdn.contentful.com', // if use "Delivery" token
  });

  const getAuthors = async () => {
    try {
      const entries = await client.getEntries({}); // fetch all data
      // const entries = await client.getEntries({
      //   content_type: 'author',
      //   select: 'fields',
      //   order: 'fields.name',
      // }); // returns object(optionl) for selective data
      const sanitizeEntries = entries.items.map((item) => {
        const avatar = item?.fields?.avatar?.fields;
        return {
          ...item?.fields,
          avatar,
        };
      });
      return { entries, sanitizeEntries };
    } catch (error) {
      console.log('Error-Fetch-Authors->', error);
    }
  };

  return { getAuthors };
};

export default useContentful;
