export async function GET(request: Request) {
  const req = request.headers.get("id");
  return new Response("Hello I m backend Api");
}
