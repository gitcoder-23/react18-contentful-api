import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContentfulClient } from '../../useContentful';

const HomeBanner = () => {
  const { clientData } = useContentfulClient();
  const navigate = useNavigate();
  const [homeBanner, setHomeBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    clientData
      .getEntries({ content_type: 'homeBanner' })
      .then((bannerData) => {
        console.log('bannerData->', bannerData);
        setIsLoading(false);
        const sanitizeEntries = bannerData.items.map((item, indx) => {
          return {
            ...item?.fields,
            id: indx,
          };
        });

        console.log('homeBanner->', sanitizeEntries);
        setHomeBanner(sanitizeEntries);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('err->', err);
      });
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
          React App Using Contentful Api
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

export default HomeBanner;
