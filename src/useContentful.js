import { createClient } from 'contentful';

const useContentful = () => {
  let preview = false;
  const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN, // for production "Delivery"
    // host: 'preview.contentful.com', // if use "preview" token
    host: process.env.REACT_APP_DELIVERY_URL, // if use "Delivery" token
  });

  const getAuthors = async () => {
    try {
      const entries = await client.getEntries({ content_type: 'posts' }); // fetch all data
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

  return { getAuthors, client };
};

export default useContentful;
