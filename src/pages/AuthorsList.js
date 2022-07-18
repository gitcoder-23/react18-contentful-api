import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useContentful } from '../useContentful';

const AuthorsList = () => {
  const { getAuthors, client } = useContentful();
  const navigate = useNavigate();
  const [allAuthors, setAllAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    console.log('client->', client);
    client
      .getEntries({ content_type: 'posts' })
      .then((authorDatas) => {
        setIsLoading(false);
        const sanitizeEntries = authorDatas.items.map((item, indx) => {
          const avatar = item?.fields?.avatar?.fields;
          return {
            ...item?.fields,
            avatar,
            id: indx,
          };
        });

        console.log('sanitizeEntries->', sanitizeEntries);
        setAllAuthors(sanitizeEntries);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('err->', err);
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

  const deleteClick = (id) => {
    console.log('deleteClick->', id);
    if (window.confirm('Do you want to delete?')) {
      // const existingUser = allAuthors.find((user) => user.id === id);
      // if (existingUser) {
      //   return allAuthors.filter((user) => user.id !== id);
      // }
      axios
        .delete(
          `https://cdn.contentful.com/spaces/re181t9ltost/environments/master/entries?content_type=posts/${id}`
        )
        .then((delRes) => {
          console.log('delRes->', delRes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        <button
          type="button"
          className="btn btn-primary mx-4"
          onClick={() => navigate('/graphql/ops')}
        >
          GraphqlOps
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate('/home')}
        >
          Home Client
        </button>
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
                  <td className="col-2">
                    <button
                      type="button"
                      className="btn btn-info"
                      style={{ marginRight: 6 }}
                      onClick={() => viewClick(allData)}
                    >
                      View
                    </button>
                    {/* <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteClick(allData.id)}
                    >
                      Delete
                    </button> */}
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
