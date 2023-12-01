import { useEffect } from 'react';

import useUsersFacade from '@/hooks/useUsersFacade';

const Users = () => {
  const { users, loading, error, fetchUsers } = useUsersFacade();

  useEffect(() => fetchUsers(), []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users?.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
