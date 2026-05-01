import { ambilSemuaPengguna } from "@/services/layananPengguna";

export default async function Page() {
  const data = await ambilSemuaPengguna();

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.first_name}</li>
      ))}
    </ul>
  );
}
