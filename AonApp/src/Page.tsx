import React, { useState, useEffect } from 'react';
import * as Helpers from './Helpers';

function PageView() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);
  const series = 'lw';

  function setChapter(chapter, book) {
    setIsLoaded(false);
    Helpers.storeStoryState(series, book, chapter);
    Helpers.getChapter(series, book, chapter)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if (!(result?.choice?.length > 0)) {
            let text = 'Restart this book';
            if (book === '01fftd' && chapter === 'sect350') {
              book = '02fotw';
              text = 'Move on to the next book';
            } else if (book === '02fotw' && chapter === 'sect350') {
              book = '03tcok';
              text = 'Move on to the next book';
            } else if (book === '03tcok' && chapter === 'sect350') {
              book = '04tcod';
              text = 'Move on to the next book';
            } else if (book === '04tcod' && chapter === 'sect350') {
              book = '05sots';
              text = 'Move on to the next book';
            } else if (book === '05sots' && chapter === 'sect400') {
              book = '06tkot';
              text = 'Move on to the next book';
            } else if (book === '06tkot' && chapter === 'sect350') {
              book = '07cd';
              text = 'Move on to the next book';
            } else if (book === '07cd' && chapter === 'sect350') {
              book = '08tjoh';
              text = 'Move on to the next book';
            } else if (book === '08tjoh' && chapter === 'sect350') {
              book = '09tcof';
              text = 'Move on to the next book';
            } else if (book === '09tcof' && chapter === 'sect350') {
              book = '10tdot';
              text = 'Move on to the next book';
            } else if (book === '10tdot' && chapter === 'sect350') {
              book = '11tpot';
              text = 'Move on to the next book';
            } else if (book === '11tpot' && chapter === 'sect350') {
              book = '12tmod';
              text = 'Move on to the next book';
            } else if (book === '12tmod' && chapter === 'sect350') {
              book = '13tplor';
              text = 'Move on to the next book';
            } else if (book === '13tplor' && chapter === 'sect350') {
              book = '14tcok';
              text = 'Move on to the next book';
            } else if (book === '14tcok' && chapter === 'sect350') {
              book = '15tdc';
              text = 'Move on to the next book';
            } else if (book === '15tdc' && chapter === 'sect350') {
              book = '16tlov';
              text = 'Move on to the next book';
            } else if (book === '16tlov' && chapter === 'sect350') {
              book = '17tdoi';
              text = 'Move on to the next book';
            } else if (book === '17tdoi' && chapter === 'sect350') {
              book = '18dotd';
              text = 'Move on to the next book';
            } else if (book === '18dotd' && chapter === 'sect350') {
              book = '19wb';
              text = 'Move on to the next book';
            } else if (book === '19wb' && chapter === 'sect350') {
              book = '20tcon';
              text = 'Move on to the next book';
            } else if (book === '20tcon' && chapter === 'sect350') {
              book = '21votm';
              text = 'Move on to the next book';
            } else if (book === '21votm' && chapter === 'sect350') {
              book = '22tbos';
              text = 'Move on to the next book';
            } else if (book === '22tbos' && chapter === 'sect350') {
              book = '23mh';
              text = 'Move on to the next book';
            } else if (book === '23mh' && chapter === 'sect350') {
              book = '24rw';
              text = 'Move on to the next book';
            } else if (book === '24rw' && chapter === 'sect350') {
              book = '25totw';
              text = 'Move on to the next book';
            } else if (book === '25totw' && chapter === 'sect350') {
              book = '26tfobm';
              text = 'Move on to the next book';
            } else if (book === '26tfobm' && chapter === 'sect350') {
              book = '27v';
              text = 'Move on to the next book';
            } else if (book === '27v' && chapter === 'sect350') {
              book = '28thos';
              text = 'Move on to the next book';
            } else if (book === '28thos' && chapter === 'sect300') {
              book = '01fftd';
              text = 'Restart the entire series';
            }

            result.choice.push({
              text: text,
              chapterId: 'sect1',
            });
          }

          for (const choice of result.choice) {
            choice.book = book;
          }

          console.log(result);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  useEffect(() => {
    const state = Helpers.getStoryState();
    if (state?.book && state?.chapter) {
      setChapter(state.chapter, state.book);
    } else {
      setChapter('sect1', '01fftd');
    }
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return 'Loading Data...';
  } else {
    return (
      <section className="container-fluid">
        <div className="row">
          <div>
            {data?.illustration.map((item) => (
              <img src={item?.url} alt={item?.text} key={item?.text} />
            ))}
          </div>
          <div>
            {data?.story.map((item) => (
              <div key={item.text}>
                <p>{Helpers.stripHtml(item.text)}</p>
              </div>
            ))}
          </div>
          <div>
            {data?.choice.map((item) => (
              <div key={item.text}>
                <p
                  className="choice"
                  onClick={() => setChapter(item?.chapterId, item?.book)}
                >
                  {Helpers.stripHtml(item.text)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

class PageList extends React.Component {
  render() {
    return <PageView />;
  }
}

export default PageList;
