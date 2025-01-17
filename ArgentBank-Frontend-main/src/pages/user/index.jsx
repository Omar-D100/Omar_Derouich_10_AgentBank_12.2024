import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UpdateForm from '../../components/updateForm';
import Account from '../../components/Account';
import accountsData from '../../data/AccountCard.json';
import './style.css';

export default function User() {
  const [isEditing, setIsEditing] = useState(false);
  const [openAccountId, setOpenAccountId] = useState(null);

  const { accessToken, user } = useSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <main>
      <div className="header">
        <h1>Welcome back<br />{user.userName}!</h1>
        <button onClick={() => setIsEditing(true)} className="edit-button">
          Edit Name
        </button>
        {isEditing && <UpdateForm onCancel={() => setIsEditing(false)} />}
      </div>

      <h2 className="sr-only">Accounts</h2>
      {accountsData.accounts.map((account) => (
        <Account
          key={account.id}
          account={account}
          openAccountId={openAccountId}
          setOpenAccountId={setOpenAccountId}
        />
      ))}
    </main>
  );
}