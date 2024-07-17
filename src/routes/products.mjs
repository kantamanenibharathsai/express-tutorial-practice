import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  console.log(request.headers.cookie);
  console.log(request.cookies);
  console.log(request.signedCookies.Hello);
  if (request.signedCookies.Hello && request.signedCookies.Hello === "world")
    return response.send([
      { id: 1, name: "chciken-breast", price: 12.99 },
      { id: 2, name: "chciken-breast", price: 12.99 },
      { id: 3, name: "chciken-breast", price: 12.99 },
      { id: 4, name: "chciken-breast", price: 12.99 },
      { id: 5, name: "chciken-breast", price: 12.99 },
    ]);
  return response
    .status(403)
    .send({ msg: "Sorry. You need the correct cookie" });
});

export default router;
