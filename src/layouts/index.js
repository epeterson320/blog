import React from 'react';
import Helmet from 'react-helmet';
import 'prismjs/themes/prism-solarizedlight.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import './global.css';

export default ({ children, data }) => (
  <div id="root">
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        {
          name: 'description',
          content: data.site.siteMetadata.description,
        },
        {
          name: 'keywords', content: data.site.siteMetadata.keywords,
        },
      ]}
      htmlAttributes={{ lang: 'en' }}
    />
    <Header />
    {children()}
    <Footer />
  </div>
);

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        description
        keywords
      }
    }
  }
`;