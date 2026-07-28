import { renderToHtml, Email, Page } from '@unlayer/react-elements';
import React from 'react';

const emailHtml = renderToHtml(
  <Email backgroundColor="#121212">
    Hello
  </Email>
);

const pageHtml = renderToHtml(
  <Page backgroundColor="#121212">
    Hello
  </Page>
);

console.log("PAGE HTML:");
console.log(pageHtml);
