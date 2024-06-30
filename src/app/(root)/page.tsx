import { fetchEchoes } from "./_actions/echoes";

export default async function Home() {
  const result = await fetchEchoes(1, 30);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
    </>
  );
}
