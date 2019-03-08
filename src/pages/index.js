import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Page from '../components/Page';
import SEO from '../components/SEO';
import Projects from '../projects';
import { PageTitleArea, Title, SubTitle, Or } from '../components/titles';

const IndexPage = ({ data }) => (
  <Page className="items-center">
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <PageTitleArea>
      <Title>Software engineer in the D.C. Metro area,</Title>
      <Or />
      <SubTitle>Blogger and 1x developer,</SubTitle>
      <Or />
      <SubTitle>Deft wielder of JavaScript and duct tape.</SubTitle>
    </PageTitleArea>
    <p className="mb-4 max-w-md">
      <Img
        className="float-right m-1"
        fixed={data.file.childImageSharp.fixed}
        alt="Portrait photo of Eric's face"
      />
      <em className="text-2xl">I'm Eric, and </em>
      I'm a mobile and web app developer in Northern Virginia. I've worked for
      enterprises and small companies in the energy, publishing, and healthcare
      industries. I build highly interactive web applications, with a focus on
      data visualization and clean UI. I have 25 years of experience with
      React.js, in dog years.
    </p>

    <section className="mb-10 max-w-md">
      <h2 className="font-bold mb-3">Projects</h2>
      <p>Some stuff I've built over the years.</p>
      <Projects />
    </section>

    <section className="max-w-md flex-col flex items-center">
      <h2 className="font-bold mb-3">Latest Blog Posts</h2>
      <p className="mb-5">
        Career experts say you should know your niche, so I focus on modern app
        development. I know other things, like how to write performant SQL
        statements and implement custom OAuth 2.0 authorization flows, but I'll
        keep that to myself.
      </p>
      {data.allMarkdownRemark.edges.map(
        ({
          node: {
            frontmatter: { title },
            fields: { date, slug, dateTime, previewText },
            excerpt,
          },
        }) => (
          <a key={slug} href={slug} className="block group no-underline">
            <h3 className="inline font-bold text-xl text-black group-hover:text-orange-dark mb-6">
              {title}
            </h3>
            <span className="text-black inline-block">
              {' '}
              —{' '}
              <time className="text-grey-dark" dateTime={dateTime}>
                {date}
              </time>
            </span>
            <p className="text-black mt-3 mb-6">{previewText || excerpt}</p>
          </a>
        ),
      )}
    </section>
  </Page>
);

export default IndexPage;

export const query = graphql`
  query HomePageQuery {
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
            dateTime: date
          }
          excerpt
        }
      }
    }
    file(relativePath: { eq: "ericp-sq.jpg" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
