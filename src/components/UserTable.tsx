import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchUsers } from '../features/users/usersSlice';

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const userStatus = useSelector((state: RootState) => state.users.status);
  const [search, setSearch] = useState({
    name: '',
    username: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({ ...prevState, [name]: value }));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.name.toLowerCase()) &&
    user.username.toLowerCase().includes(search.username.toLowerCase()) &&
    user.email.toLowerCase().includes(search.email.toLowerCase()) &&
    user.phone.toLowerCase().includes(search.phone.toLowerCase())
  );

  return (
    <div className="user-table-container">
      <h1>User Management Table</h1>
      <div className="search-container">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={search.name}
          onChange={handleSearchChange}
          className="search-input"
        />
        <input
          type="text"
          name="username"
          placeholder="Search by username"
          value={search.username}
          onChange={handleSearchChange}
          className="search-input"
        />
        <input
          type="text"
          name="email"
          placeholder="Search by email"
          value={search.email}
          onChange={handleSearchChange}
          className="search-input"
        />
        <input
          type="text"
          name="phone"
          placeholder="Search by phone"
          value={search.phone}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} onClick={() => setSearch({ ...search, name: user.name })}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
