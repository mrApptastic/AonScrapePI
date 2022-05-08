import React, { useState, useEffect } from 'react';
import * as Helpers from './Helpers';

function PageView() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [book, setBook] = useState('01fftd');
  const series = 'lw';

  function setChapter(chapter) {
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
              setBook('02fotw');
              text = 'Move on to the next book';
            } else if (book === '02fotw' && chapter === 'sect350') {
              setBook('03tcok');
              text = 'Move on to the next book';
            } else if (book === '03tcok' && chapter === 'sect350') {
              setBook('04tcod');
              text = 'Move on to the next book';
            } else if (book === '04tcod' && chapter === 'sect350') {
              setBook('05sots');
              text = 'Move on to the next book';
            } else if (book === '05sots' && chapter === 'sect400') {
              setBook('06tkot');
              text = 'Move on to the next book';
            } else if (book === '06tkot' && chapter === 'sect350') {
              setBook('07cd');
              text = 'Move on to the next book';
            } else if (book === '07cd' && chapter === 'sect350') {
              setBook('08tjoh');
              text = 'Move on to the next book';
            } else if (book === '08tjoh' && chapter === 'sect350') {
              setBook('09tcof');
              text = 'Move on to the next book';
            } else if (book === '09tcof' && chapter === 'sect350') {
              setBook('10tdot');
              text = 'Move on to the next book';
            } else if (book === '10tdot' && chapter === 'sect350') {
              setBook('11tpot');
              text = 'Move on to the next book';
            } else if (book === '11tpot' && chapter === 'sect350') {
              setBook('12tmod');
              text = 'Move on to the next book';
            } else if (book === '12tmod' && chapter === 'sect350') {
              setBook('13tplor');
              text = 'Move on to the next book';
            } else if (book === '13tplor' && chapter === 'sect350') {
              setBook('14tcok');
              text = 'Move on to the next book';
            } else if (book === '14tcok' && chapter === 'sect350') {
              setBook('15tdc');
              text = 'Move on to the next book';
            } else if (book === '15tdc' && chapter === 'sect350') {
              setBook('16tlov');
              text = 'Move on to the next book';
            } else if (book === '16tlov' && chapter === 'sect350') {
              setBook('17tdoi');
              text = 'Move on to the next book';
            } else if (book === '17tdoi' && chapter === 'sect350') {
              setBook('18dotd');
              text = 'Move on to the next book';
            } else if (book === '18dotd' && chapter === 'sect350') {
              setBook('19wb');
              text = 'Move on to the next book';
            } else if (book === '19wb' && chapter === 'sect350') {
              setBook('20tcon');
              text = 'Move on to the next book';
            } else if (book === '20tcon' && chapter === 'sect350') {
              setBook('21votm');
              text = 'Move on to the next book';
            } else if (book === '21votm' && chapter === 'sect350') {
              setBook('22tbos');
              text = 'Move on to the next book';
            } else if (book === '22tbos' && chapter === 'sect350') {
              setBook('23mh');
              text = 'Move on to the next book';
            } else if (book === '23mh' && chapter === 'sect350') {
              setBook('24rw');
              text = 'Move on to the next book';
            } else if (book === '24rw' && chapter === 'sect350') {
              setBook('25totw');
              text = 'Move on to the next book';
            } else if (book === '25totw' && chapter === 'sect350') {
              setBook('26tfobm');
              text = 'Move on to the next book';
            } else if (book === '26tfobm' && chapter === 'sect350') {
              setBook('27v');
              text = 'Move on to the next book';
            } else if (book === '28thos' && chapter === 'sect350') {
              setBook('28thos');
              text = 'Move on to the next book';
            } else if (book === '28thos' && chapter === 'sect300') {
              setBook('01fftd');
              text = 'Restart the entire series';
            }

            result.choice.push({
              text: text,
              chapterId: 'sect1',
            });
          }

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
    console.log(state);
    if (state?.book && state?.chapter) {
      setBook(state.book);
      setChapter(state.chapter);
    } else {
      setChapter('sect1');
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
              <img src={item?.url} alt={item?.text} />
            ))}
          </div>
          <div>
            {data?.story.map((item) => (
              <div>
                <p key={item.text}>{Helpers.stripHtml(item.text)}</p>
              </div>
            ))}
          </div>
          <div>
            {data?.choice.map((item) => (
              <div>
                <p
                  className="choice"
                  onClick={() => setChapter(item?.chapterId)}
                  key={item.text}
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
