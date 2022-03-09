import React from 'react';

const User = ({ user }) => {
  return (
    <tr>
      <td>
        {user.name}
      </td>
      <td>
        {user.blog.length}
      </td>
    </tr>
  );
};
export default User;