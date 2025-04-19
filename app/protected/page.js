import ProtectedRoute from '../components/ProtectedRoute';

const ProtectedPage = () => {
  return (
    <ProtectedRoute>
      <h1>This is a protected page</h1>
      <p>You can only see this if you are logged in.</p>
    </ProtectedRoute>
  );
};

export default ProtectedPage;