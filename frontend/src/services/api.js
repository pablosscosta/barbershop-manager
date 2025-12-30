const apiUrl = import.meta.env.VITE_API_URL;

export async function getBarbers() {
  const response = await fetch(`${apiUrl}/barbers`);
  if (!response.ok) throw new Error("Erro ao buscar barbeiros");
  return response.json();
}
