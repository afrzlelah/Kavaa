import { getAllUsers } from "@/services/getAllUser";

export default async function Page() {
  const data = await getAllUsers();

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.first_name}</li>
      ))}
    </ul>
  );
}
