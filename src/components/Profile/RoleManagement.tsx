// guardian-io/src/components/Profile/RoleManagement.tsx
import React from 'react';
import { RoleData } from '../../types/profileTypes';

interface RoleManagementProps {
  roles: RoleData[];
}

export default function RoleManagement({ roles }: RoleManagementProps) {
  return (
    <div>
      <h2>Role Management</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.name} - {role.permissions.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}