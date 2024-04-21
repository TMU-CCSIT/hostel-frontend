import { renderToStaticMarkup } from 'react-dom/server';

export function renderReactToStaticMarkup(reactComponent: React.ReactElement) {

  return renderToStaticMarkup(reactComponent);
  
}


