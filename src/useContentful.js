import { createClient } from 'contentful';

const useContentful = () => {
  let preview = false;
  const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    // accessToken: 'Q6oImuk50FR2y9hU_7xKHsIeEA8scfLgYy_7-Ex0h60', // for "preview"
    accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN, // for production "Delivery"
    // host: 'preview.contentful.com', // if use "preview" token
    host: process.env.REACT_APP_DELIVERY_URL, // if use "Delivery" token
    // space: process.env.REACT_APP_CONTENTFUL_SPACE,
    // accessToken: preview
    //   ? process.env.REACT_APP_CONTENTFUL_PREVIEW_TOKEN
    //   : process.env.REACT_APP_CONTENTFUL_TOKEN,
    // environment: process.env.REACT_APP_CONTENTFUL_ENV,
    // host: preview
    //   ? process.env.REACT_APP_PREVIEW_URL
    //   : process.env.REACT_APP_DELIVERY_URL,
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
