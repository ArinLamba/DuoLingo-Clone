import { redirect } from "next/navigation";

import { getIsAdmin } from "@/lib/admin";

import ClientWrapper from "./client-wrapper";

const AdminPage = async () => {

  const isAdmin = await getIsAdmin();

  if(!isAdmin) {
    redirect("/");
  }

  return (
    <ClientWrapper />
  );
};

export default AdminPage;