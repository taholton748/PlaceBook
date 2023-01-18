import Feed from '../components/Feed';
import PostForm from '../components/PostForm';

export default function Dashboard() {
  return (
    <div>
      <PostForm />
      <h2>Dashboard</h2>
      <Feed />
    </div>
  );
}
