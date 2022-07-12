import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const AuthorView = () => {
  const { authorData } = useLocation().state;
  const { id } = useParams();
  const [authorDatas, setAuthorData] = useState({});
  useEffect(() => {
    setAuthorData(authorData);
  }, [authorData, id]);
  // useEffect(() => {
  //   setAuthorData(authorData);
  // }, [authorData]);
  console.log('authorDatas->', authorDatas);

  return (
    <>
      <div
        className="card mb-3 mt-5"
        style={{
          maxWidth: '540px',
        }}
      >
        <div
          className="row g-0"
          style={{ border: '1px solid #000', marginLeft: 20 }}
        >
          <div className="col-md-4">
            <img
              src={authorData?.avatar?.file?.url}
              className="img-fluid rounded-start"
              alt={authorData?.avatar?.title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{authorData?.name}</h2>
              <h3 className="card-title">{authorData?.email}</h3>
              <h3 className="card-title">{authorData?.phone}</h3>
              <p className="card-text">{authorData?.description}</p>
              {/* <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorView;
