import { useAuth } from 'hooks';
import Router from 'next/router';

function SubmitPost() {
  const isLoggedIn = useAuth();

  return <h1>Hello, I'm Submit Post</h1>;
}

export default SubmitPost;
