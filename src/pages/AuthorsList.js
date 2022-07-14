import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useContentful from '../useContentful';

const AuthorsList = () => {
  const { getAuthors } = useContentful();
  const navigate = useNavigate();
  const [allAuthors, setAllAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAuthors()
      .then((response) => {
        setIsLoading(false);
        console.log('response->', response.sanitizeEntries);
        setAllAuthors(response.sanitizeEntries);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const viewClick = (allData, id) => {
    navigate(`/author/view/${allData.phone}`, {
      state: { authorData: allData },
    });
    // navigate(`/author/view`, {
    //   state: { authorData: allData },
    // });
  };

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
        <table className="table table-striped table-hover mt-5">
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allAuthors &&
              allAuthors.map((allData, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Avatar
                      size="100"
                      facebook-id="invalidfacebookusername"
                      alt={allData.avatar.title}
                      src={allData.avatar.file.url}
                      round="20px"
                    />
                  </td>
                  <td>{allData.name}</td>
                  <td>{allData.email}</td>
                  <td>{allData.phone}</td>
                  <td>{allData.description}</td>
                  <td>
                    {/* <Link to={`/author/view/${allData.phone}`}>View</Link> */}
                    <button type="button" onClick={() => viewClick(allData)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AuthorsList;
