import { normalize, setupPage } from 'csstips';
import { cssRule, fontFace } from 'typestyle';

const woffUrls: { [key: string]: string } = {
  '300': require('typeface-open-sans/files/open-sans-latin-300.woff'),
  '300-italic': require('typeface-open-sans/files/open-sans-latin-300italic.woff'),
  '400': require('typeface-open-sans/files/open-sans-latin-400.woff'),
  '400-italic': require('typeface-open-sans/files/open-sans-latin-400italic.woff'),
  '600': require('typeface-open-sans/files/open-sans-latin-600.woff'),
  '600-italic': require('typeface-open-sans/files/open-sans-latin-600italic.woff')
};

const woff2Urls: { [key: string]: string } = {
  '300': require('typeface-open-sans/files/open-sans-latin-300.woff2'),
  '300-italic': require('typeface-open-sans/files/open-sans-latin-300italic.woff2'),
  '400': require('typeface-open-sans/files/open-sans-latin-400.woff2'),
  '400-italic': require('typeface-open-sans/files/open-sans-latin-400italic.woff2'),
  '600': require('typeface-open-sans/files/open-sans-latin-600.woff2'),
  '600-italic': require('typeface-open-sans/files/open-sans-latin-600italic.woff2')
};

function initStyles(rootId: string): void {
  normalize();

  setupPage(`#${rootId}`);

  for (const fontWeight of [300, 400, 600]) {
    loadFont(fontWeight, '', woffUrls[fontWeight], woff2Urls[fontWeight]);
    loadFont(fontWeight, 'italic', woffUrls[`${fontWeight}-italic`], woff2Urls[`${fontWeight}-italic`]);
  }

  cssRule('html, body', {
    height: 'auto'
  });

  cssRule('html', {
    backgroundColor: '#ebebeb'
  });

  cssRule('body', {
    fontFamily: 'OpenSans, Helvetica Neue, Helvetica, Tahoma, sans-serif',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '20px',
    color: '#666666',
    textRendering: 'optimizeLegibility'
  });

  cssRule(`#${rootId}`, {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minWidth: 360,
    maxWidth: 1200,
    margin: 0,
    padding: '0 12px'
  });

  cssRule('p', {
    margin: 0,
    $nest: {
      '& + p': {
        marginTop: 8
      }
    }
  });

  cssRule('a', {
    color: '#0092dd',
    textDecoration: 'none',
    fontWeight: 400
  });

  cssRule('pre', {
    display: 'inline-block',
    fontFamily: `Consolas, Monaco, "Courier New", Courier, monospace`,
    overflowX: 'auto',
    tabSize: 2,
    color: '#333333',
    backgroundColor: '#EFEFEF',
    padding: 12,
    borderRadius: 4
  });
}

async function loadFont(
  fontWeight: number,
  fontStyle: '' | 'italic',
  woffUrl: string,
  woff2Url: string
): Promise<void> {
  fontFace(
    {
      fontFamily: 'OpenSans',
      fontWeight,
      fontStyle,
      src: `url(${woffUrl})`
    },
    {
      fontFamily: 'OpenSans',
      fontWeight,
      fontStyle,
      src: `url(${woff2Url})`
    }
  );
}

export { initStyles };
