import React, { useState, useEffect } from 'react';
import * as Helpers from './Helpers';

function DataView() {
  const pagesize = 64;
  const offset = 0;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    Helpers.getChapter('lw', '01fftd', 'sect51')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.story);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return 'Loading Data...';
  } else {
    return (
      <section className="container-fluid">
        <div className="row">
          {items.map((item) => (
            <div>
              <h2></h2>
              <p key={item.text}>{Helpers.stripHtml(item.text)}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

class DataList extends React.Component {
  render() {
    return <DataView />;
  }
}

export default DataList;
