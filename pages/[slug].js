import GhostContentAPI from '@tryghost/content-api';

// Initialize the Ghost API
const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: 'v3'
});

export async function getStaticPaths() {
    const posts = await api.posts.browse();

    return {
        paths: posts.map((post) => ({ params: { slug: post.slug } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const post = await api.posts.read({ slug: params.slug });

    return {
        props: { post },
    };
}

export default function Post({ post }) {
    return (
        <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        </div>
    );
}

