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
    const state = Helpers.getStoryState();
    if (state?.book) {
      getHeader('lw', state.book, 'title.png');
    } else {
      getHeader('lw', '01fftd', 'title.png');
    }
  }, []);

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="title-bar">
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
