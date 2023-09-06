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
        <>
            <meta charSet="UTF-8" />
            <title>{post.title}</title>
            <link rel="stylesheet" href="/blog-style.css" />
            <link rel="stylesheet" href="https://use.typekit.net/zkz4rdl.css" />
            <div className="blog-post">
                <div className="logo-container">
                    <a href="homepage.html">
                        <img src="/logo-white.svg" alt="Home" />
                    </a>
                </div>
                <h1 className="title">{post.title}</h1>
                <p className="date">{new Date(post.published_at).toLocaleDateString()}</p>
                <img className="cover-photo" src={post.feature_image} alt="Cover Photo" />
                <div className="markdown-content" dangerouslySetInnerHTML={{ __html: post.html }}></div>
                <div className="related-links">
                    <a href="#" className="link-box">
                        Link 1
                    </a>
                    <a href="#" className="link-box">
                        Link 2
                    </a>
                    <a href="#" className="link-box">
                        Link 3
                    </a>
                </div>
                <footer>New World Person 2023</footer>
            </div>
        </>
    );
}