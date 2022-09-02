export default function middleware(request) {
  if (request.url.endsWith("/discord")) {
    return Response.redirect("https://discord.gg/FjpWuHy5Ht");
  }
}
