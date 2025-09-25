const api_url = "http://localhost:10010";

// ---------------- Existing APIs ----------------

export const startPlan = async () => {
    const url = `${api_url}/Plan`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });

    if (!response.ok) throw new Error("Failed to create plan");

    return await response.json();
};

export const addProcedureToPlan = async (planId, procedureId) => {
    const url = `${api_url}/Plan/AddProcedureToPlan`;
    var command = { planId: planId, procedureId: procedureId };
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
    });

    if (!response.ok) throw new Error("Failed to add procedure to plan");

    return true;
};

export const getProcedures = async () => {
    const url = `${api_url}/Procedures`;
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to get procedures");

    return await response.json();
};

export const getPlanProcedures = async (planId) => {
    const url = `${api_url}/PlanProcedure?$filter=planId eq ${planId}&$expand=procedure`;
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to get plan procedures");

    return await response.json();
};

export const getUsers = async () => {
    const url = `${api_url}/Users`;
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to get users");

    return await response.json();
};

// ---------------- New User Assignment APIs ----------------

export const getUsersForProcedure = async (planProcedureId) => {
    const url = `${api_url}/Procedures/${planProcedureId}/Users`;
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to fetch users for procedure");

    return await response.json();
};

export const assignUserToProcedure = async (planProcedureId, userId) => {
    const url = `${api_url}/Procedures/${planProcedureId}/Users`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) throw new Error("Failed to assign user");

    return await response.json();
};

export const removeUserFromProcedure = async (planProcedureId, userId) => {
    const url = `${api_url}/Procedures/${planProcedureId}/Users/${userId}`;
    const response = await fetch(url, {
        method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to remove user");
};

export const removeAllUsersFromProcedure = async (planProcedureId) => {
    const url = `${api_url}/Procedures/${planProcedureId}/Users`;
    const response = await fetch(url, {
        method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to remove all users");
};
