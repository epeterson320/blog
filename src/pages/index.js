import React from 'react';
import g from 'glamorous';
import Img from 'gatsby-image';

import Main from '../components/Main';
import Headline from '../components/Headline';
import BlogExcerpt from '../components/BlogExcerpt';

import { rhythm, scale } from '../utils/typography';

export default ({ data }) => (
  <Main>
    <Headline>Software engineer in the D.C. Metro area,</Headline>
    <Or>or,</Or>
    <AltHeadline>Blogger and 1x developer,</AltHeadline>
    <Or>or,</Or>
    <AltHeadline>Heavy user of JavaScript and duct tape.</AltHeadline>
    <ProfileImg resolutions={data.file.childImageSharp.resolutions} />
    <g.P marginTop={rhythm(1)}>
      <g.Em {...scale(0.5)}>I'm Eric, and </g.Em>
      I'm a mobile and web app developer in Northern Virginia. I've worked for
      enterprises and small companies in the energy, publishing, and healthcare
      industries. I build highly interactive web applications, with a focus on
      data visualization and clean UI.
    </g.P>

    <g.Section marginTop={rhythm(3)}>
      <h2>Projects</h2>
      {data.allIndexYaml.edges.map(({ node }) => (
        <Project key={node.name} {...node} />
      ))}
    </g.Section>

    <g.Section marginTop={rhythm(3)}>
      <h2>Latest Blog Posts</h2>
      <p>
        Career experts say you should know your niche, so I focus on modern app
        development. I know other things, like how to write performant SQL
        statements and implement custom OAuth 2.0 authorization flows, but I'll
        keep that to myself.
      </p>

      {data.allMarkdownRemark.edges.map(({
        node: {
          frontmatter: { title },
          fields: {
            slug, datetime, date, previewText,
          },
          excerpt,
        },
      }) => (
        <BlogExcerpt
          key={slug}
          slug={slug}
          title={title}
          previewText={previewText || excerpt}
          dateTime={datetime}
          date={date}
        />
      ))}
    </g.Section>
  </Main>
);

const Project = ({ link, name, description }) => (
  <g.Section>
    <g.H3 margin={rhythm(0)} {...scale(0)}>
      <a href={link}>{name}</a>
    </g.H3>
    <p>{description}</p>
  </g.Section>
);

const Or = g.span({
  fontStyle: 'italic',
  display: 'block',
  textAlign: 'center',
  color: 'rgba(0,0,0,0.54)',
});

const AltHeadline = g.span({
  display: 'block',
  textAlign: 'center',
  ...scale(0.5),
});

const ProfileImg = g(Img)({
  float: 'right',
  marginTop: rhythm(1.5),
});

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allIndexYaml {
      edges {
        node {
          name
          description
          link
        }
      }
    }
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            previewText
            slug
            date: date(formatString: "MMMM DD, YYYY")
            datetime: date
          }
          excerpt(pruneLength: 280)
        }
      }
    }
    file(relativePath: { eq: "ericp-sq.jpg" }) {
      childImageSharp {
        resolutions(width: 350, height: 350) {
          ...GatsbyImageSharpResolutions
        }
      }
    }
  }
`;
