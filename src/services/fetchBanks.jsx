const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const fetchBanks = async (pageIndex = 1, pageSize = 10, uid = "") => {
  const url =
    `${BASE_URL}/Banks?pageIndex=${pageIndex}&pageSize=${pageSize}` +
    (uid ? `&Uid=${uid}` : "");
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`${errorBody.message} (Status: ${errorBody.statusCode})`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching banks:", error);
    throw error;
  }
};

export const deleteBank = async (uid) => {
  const url = `${BASE_URL}/Banks/${uid}`;
  try {
    const response = await fetch(url, { method: "DELETE", headers });
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`${errorBody.message} (Status: ${errorBody.statusCode})`);
    }
    return "Bank successfully deleted";
  } catch (error) {
    console.error("Error deleting the bank:", error);
    throw error;
  }
};

export const createBank = async (bankData) => {
  const url = `${BASE_URL}/Banks/createBank`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(bankData),
    });
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`${errorBody.message} (Status: ${errorBody.statusCode})`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating the bank:", error);
    throw error;
  }
};

export const updateBankName = async (uid, bankName) => {
  const url = `${BASE_URL}/Banks/UpdateBank/${uid}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ bank_name: bankName }),
    });
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`${errorBody.message} (Status: ${errorBody.statusCode})`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating the bank name:", error);
    throw error;
  }
};
