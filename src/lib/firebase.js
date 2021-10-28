import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const signIn = async (email, password) => {
  initFirebase();
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  initFirebase();
  return firebase.auth().signOut();
};

export const onAuthStateChanged = async (callback) => {
  initFirebase();
  return firebase.auth().onAuthStateChanged((user) => callback(user));
};

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

export const createPost = async (post) => {
  initFirebase();
  const dateCreated = new Date().getTime();
  post.dateCreated = dateCreated;
  return firebase.database().ref(`/posts/${post.slug}`).set(post);
};

export const getPostBySlug = async (slug) => {
  initFirebase();
  return await firebase
    .database()
    .ref(`/posts/${slug}`)
    .once('value')
    .then((snapshot) => snapshot.val());
};

export const updatePost = async (post) => {
  initFirebase();
  return firebase.database().ref(`/posts/${post.slug}`).set(post);
};

export const deletePost = async (slug) => {
  initFirebase();
  return firebase.database().ref(`/posts/${slug}`).set(null);
};
