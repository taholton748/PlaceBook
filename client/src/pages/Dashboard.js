import Feed from '../components/Feed';
import NewPostModal from '../components/NewPost';

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <button>
        <NewPostModal />
      </button>
      <Feed />
    </div>
  );
}
