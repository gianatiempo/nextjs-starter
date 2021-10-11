import { getPosts } from '@lib/firebase';
import styles from '@styles/index.module.scss';

const getFormattedDate = (milliseconds) => {
  const formatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  };
  const date = new Date(milliseconds);
  return date.toLocaleDateString(undefined, formatOptions);
};

const HomePage = ({ posts }) => (
  <div className={styles.HomePage}>
    <h1>Blog Posts</h1>
    <p>apiKey: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY}</p>
    <p>databaseURL: {process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}</p>
    <p>projectId: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}</p>
    {posts.map((post) => (
      <article key={post.slug}>
        <img src={post.coverImage} alt={post.coverImageAlt} />
        <div>
          <h2>{post.title}</h2>
          <span>{getFormattedDate(post.dateCreated)}</span>
          <p
            dangerouslySetInnerHTML={{
              __html: `${post.content.substring(0, 200)}...`,
            }}
          ></p>
        </div>
      </article>
    ))}
  </div>
);

// This is for fetching data every time the page is visited. We do this
// so that we don't have to redploy the site every time we add a blog post.
// You can read more about this in the Next.js docs at:
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering

export async function getServerSideProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default HomePage;
