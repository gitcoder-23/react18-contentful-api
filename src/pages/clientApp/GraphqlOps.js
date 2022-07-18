import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const query = `query{
  homeBanner(id: "5GhsnLwNMhiqlGCCq4bryj") {
    bannerTitle, bannerDescription
  }
  testimonialDescription(id: "5KzPzHtMOud8OY6fvtQjeI"){
    jobTitle, companyName,clientDescription, clientName, clientImage {
      title
      description
      contentType
      fileName
      size
      url
      width
      height
    }
  }
  homeBannerCollection(where: {
    AND: [{bannerTitle_contains: "Stay"}, {bannerDescription: "75 years of teaching innovation, creating strategy to skills, to build an always-on enterprise learning culture"}]
    
  }){
    items{
      bannerTitle, bannerDescription
    }
  }
  assetCollection{
    items{
      sys{
          id
        }
    }
  }
}`;

const GraphqlOps = () => {
  const {
    REACT_APP_CONTENTFUL_SPACE_CLIENT,
    REACT_APP_CONTENTFUL_DELIVERY_TOKEN_CLIENT,
  } = process.env;
  const navigate = useNavigate();
  const [homeBanner, setHomeBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // window
  //   .fetch(
  //     `https://graphql.contentful.com/content/v1/spaces/ur53vvcipt43/?access_token=pNdIiHgcvwRwwznr_uiDt5nkl6jyja1Wc3VZGJG7o5Q`,
  //     {
  //       method: 'POST',
  //       // method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ query }),
  //     }
  //   )
  //   .then((resp) => resp.json())
  //   .then((datas) => console.log('fetch->', datas))
  //   .catch((err) => console.log('err--->', err));

  useEffect(() => {
    const body = { query };
    axios
      .post(
        `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_CONTENTFUL_SPACE_CLIENT}/?access_token=${REACT_APP_CONTENTFUL_DELIVERY_TOKEN_CLIENT}`,
        body
      )
      .then((getDatas) => console.log('getDatas->', getDatas))
      .catch((err) => console.log('err->>>', err));
  }, []);
  return (
    <>
      <div className="container">
        {isLoading && <p>Loading..</p>}
        <h1
          style={{
            color: '#e85f09',
            fontSize: 25,
            fontFamily: 'sans-sarif',
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          React App Using Graphql & Contentful Api
        </h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Author List
        </button>
        <table className="table table-striped table-hover mt-5">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {homeBanner &&
              homeBanner.map((allData, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{allData.bannerTitle}</td>
                  <td>{allData.bannerDescription}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GraphqlOps;
