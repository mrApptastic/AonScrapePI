import React, { useState, useEffect } from 'react';
import * as Helpers from './Helpers';

function HeaderView() {
  const [dataHeader, setHeader] = useState(null);

  function getHeader(series, book, file) {
    Helpers.getAsset(series, book, file)
      .then((res) => res.json())
      .then(
        (result) => {
          setHeader(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    getHeader('lw', '01fftd', 'title.png');
  }, []);

  useEffect(() => {}, []);

  return (
    <section className="container-fluid">
      <div className="row">
        <div>
          <img src={dataHeader?.url} alt="Loading Header..." />
        </div>
      </div>
    </section>
  );
}

class HeaderList extends React.Component {
  render() {
    return <HeaderView />;
  }
}

export default HeaderList;
