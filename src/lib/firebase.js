import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

const initFirebase = async () => {
  // This check prevents us from initializing more than one app.
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

// Gets all posts from the database in reverse chronological order.
export const getPosts = async () => {
  initFirebase();

  const posts = await firebase
    .database()
    .ref('/posts')
    .orderByChild('dateCreated')
    .once('value')
    .then((snapshot) => {
      const snapshotVal = snapshot.val();

      const result = [];
      for (var slug in snapshotVal) {
        const post = snapshotVal[slug];
        result.push(post);
      }

      return result.reverse();
    });

  return posts;
};

/*
Creates a new post under /posts in the Realtime Database. Automatically
generates the `dateCreated` property from the current UTC time in milliseconds.
*/
export const createPost = async (post) => {
  initFirebase();

  const dateCreated = new Date().getTime();
  post.dateCreated = dateCreated;

  return firebase.database().ref(`/posts/${post.slug}`).set(post);
};
