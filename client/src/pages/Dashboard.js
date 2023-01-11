import Feed from '../components/Feed';
import NewPost from '../components/NewPost';

export default function Dashboard() {
  return (
    <div>
      <button type="button">
        <NewPost />
      </button>
      <h2>Dashboard</h2>
      <Feed />
    </div>
  );
}
