export async function FileId(file_id) {
  const response = await fetch(`/v1/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file_id: file_id }),
  });
  return await response.json();
}
