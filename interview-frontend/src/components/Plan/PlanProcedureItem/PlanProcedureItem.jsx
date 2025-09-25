import React, { useState, useEffect } from "react";
import ReactSelect from "react-select";
import {
  getUsersForProcedure,
  assignUserToProcedure,
  removeUserFromProcedure,
  removeAllUsersFromProcedure,
} from "../../../api/api";

const PlanProcedureItem = ({ procedure, users }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Load assigned users on mount
  useEffect(() => {
    async function fetchAssignedUsers() {
      const assigned = await getUsersForProcedure(procedure.id);
      const formatted = assigned.map((u) => ({
        value: u.id,
        label: u.name,
      }));
      setSelectedUsers(formatted);
    }
    fetchAssignedUsers();
  }, [procedure.id]);

  // Handle assignment changes
  const handleAssignUserToProcedure = async (newSelection) => {
    setSelectedUsers(newSelection);

    const newIds = newSelection.map((u) => u.value);
    const oldIds = selectedUsers.map((u) => u.value);

    const added = newIds.filter((id) => !oldIds.includes(id));
    const removed = oldIds.filter((id) => !newIds.includes(id));

    for (let userId of added) {
      await assignUserToProcedure(procedure.id, userId);
    }
    for (let userId of removed) {
      await removeUserFromProcedure(procedure.id, userId);
    }
  };

  // Remove all users
  const handleRemoveAllUsers = async () => {
    await removeAllUsersFromProcedure(procedure.id);
    setSelectedUsers([]);
  };

  return (
    <div className="py-2 border-b">
      <div className="font-semibold">{procedure.procedureTitle}</div>

      <ReactSelect
        className="mt-2"
        placeholder="Select User to Assign"
        isMulti
        options={users.map((u) => ({ value: u.id, label: u.name }))}
        value={selectedUsers}
        onChange={handleAssignUserToProcedure}
      />

      {selectedUsers.length > 0 && (
        <button
          onClick={handleRemoveAllUsers}
          className="mt-2 text-sm text-red-600 underline"
        >
          Remove All Users
        </button>
      )}
    </div>
  );
};

export default PlanProcedureItem;
