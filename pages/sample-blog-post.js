import GhostContentAPI from "@tryghost/content-api";

// Initialize Ghost API
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v3",
});

export async function getStaticProps(context) {
  const post = await api.posts.read({ slug: 'agua-viva' });
  
  return {
    props: { post }, // will be passed to the page component as props
  };
}

export default function SampleBlogPost({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}
