export function stripHtml(text: string): string {
  return text.replace(/(<([^>]+)>)/gi, '');
}

export function stripHtmlAndContent(text: string): string {
  return text.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi, '');
}

export async function getChapter(
  series: string,
  book: string,
  chapter: string
): Promise<any> {
  return fetch(
    'https://aon.tesj.dk/api/chapter/' + series + '/' + book + '/' + chapter
  );
}

export async function getAssets(book: string, series: string): Promise<any> {
  return fetch('https://aon.tesj.dk/api/assets/' + series + '/' + book);
}

export async function getAsset(
  series: string,
  book: string,
  file: string
): Promise<any> {
  return fetch(
    'https://aon.tesj.dk/api/assets/' + series + '/' + book + '/' + file
  );
}

export function storeStoryState(series, book, chapter): any {
  const obj = {
    series: series,
    book: book,
    chapter: chapter,
  };

  localStorage.setItem('storyState', JSON.stringify(obj));
}

export function getStoryState(): any {
  let currentState = {
    series: 'lw',
    book: '01fftd',
    chapter: 'sect1',
  };

  const storage = localStorage.getItem('storyState');

  if (storage) {
    try {
      currentState = JSON.parse(localStorage.getItem('storyState'));
    } catch (e) {
      console.log(e);
    }
  }

  return currentState;
}
