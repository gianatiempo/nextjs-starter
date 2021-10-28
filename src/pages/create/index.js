import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/auth';
import { createPost } from '../../lib/firebase';
import styles from './create.module.scss';

const CreatePage = () => {
  const router = useRouter(); // this is new
  const [formValues, setFormValues] = useState({
    title: '',
    slug: '',
    coverImage: '',
    coverImageAlt: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [user, userLoading] = useAuth();
  console.log(user, userLoading);

  const handleChange = (e) => {
    const id = e.target.id;
    const newValue = e.target.value;

    setFormValues({ ...formValues, [id]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let missingValues = [];
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value) {
        missingValues.push(key);
      }
    });

    if (missingValues.length > 1) {
      alert(`You're missing these fields: ${missingValues.join(', ')}`);
      return;
    }

    setIsLoading(true);

    createPost(formValues)
      .then(() => {
        setIsLoading(false);
        router.push('/');
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
      });
  };

  if (userLoading) {
    return null;
  }

  if (!user && typeof window !== 'undefined') {
    router.push('/404');
    return null;
  }

  return (
    <div className={styles.CreatePage}>
      <form onSubmit={handleSubmit}>
        <h1>Create a new post</h1>
        <div>
          <label htmlFor='title'>Title</label>
          <input id='title' type='text' value={formValues.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='slug'>Slug</label>
          <input id='slug' type='text' value={formValues.slug} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='coverImage'>Cover Image URL</label>
          <input id='coverImage' type='text' value={formValues.coverImage} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='coverImageAlt'>Cover Image Alt</label>
          <input id='coverImageAlt' type='text' value={formValues.coverImageAlt} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='content'>Content</label>
          <textarea id='content' value={formValues.content} onChange={handleChange} />
        </div>
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
