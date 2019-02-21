import React from 'react';
import Link from 'gatsby-link';

const BlogPost = ({
  pageContext: {
    node: { html, frontmatter, fields },
    next,
    previous,
  },
}) => (
  <main>
    <h1>{frontmatter.title}</h1>
    <div>
      <time dateTime={fields.datetime}>{fields.date}</time>
    </div>
    {/* eslint-disable react/no-danger */}
    {/* it's recommended in gatsbyjs.org/docs/adding-markdown-pages */}
    <div dangerouslySetInnerHTML={{ __html: html }} />
    {/* eslint-enable react/no-danger */}
    {previous ? (
      <Link to={previous.fields.slug}>
        Previous: {previous.frontmatter.title}
      </Link>
    ) : null}
    {next ? (
      <Link to={next.fields.slug}>
        Next: {next.frontmatter.title}
      </Link>
    ) : null}
  </main>
);

export default BlogPost;