/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path");

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const dirName = fileNode.relativeDirectory;
    const [year, month, day, ...titleWords] = dirName.split('-');
    const date = new Date(year, month - 1, day);
    const slugSegment = titleWords.join('-');
    const slug = path.posix.join('/posts', slugSegment, '/');

    createNodeField({
      node,
      name: "slug",
      value: slug
    });

    createNodeField({
      node,
      name: "date",
      value: date
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) =>
  graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    console.log(JSON.stringify(result, null, 4));
    const { createPage } = boundActionCreators
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/blog-post.js'),
        context: {
          // Data passed to context is available in page queries as GraphQL data
          slug: node.fields.slug,
        },
      });
    });
    //console.log(JSON.stringify(result, null, 4))
  })