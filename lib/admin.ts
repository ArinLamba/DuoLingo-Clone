import { auth } from "@clerk/nextjs/server";

const adminIds = [
  "user_2wJWVEDa8ra8DqY4lsgsVzkCVVb", // honey test account
  "user_2qMmVQlUlIAjxYFbvpyhV0PJGUR", // Arin to be real admin
];

export const getIsAdmin = async () => {
  const { userId } = await auth();

  if(!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
