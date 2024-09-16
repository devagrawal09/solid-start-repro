import { Title } from "@solidjs/meta";
import {
  action,
  cache,
  createAsync,
  redirect,
  useAction,
} from "@solidjs/router";

const getRandomNumberWithRedirect = cache(async () => {
  "use server";

  const num = Math.random();
  console.log("random number:", num);
  if (num < 0.5) {
    console.log("Less than 0.5, should redirect");
    throw redirect("/bang");
  }
  return num;
}, "random-redirect");

const getRandomNumber = cache(async () => {
  "use server";

  const num = await getRandomNumberWithRedirect();
  return num || "Less than 0.5, should redirect";
}, "random");

const regenerate = action(async () => {
  "use server";
  console.log("regenerating");
});

export default function Home() {
  // This redirects as expected
  // const randomNumber = createAsync(() => getRandomNumberWithRedirect());

  // This doesn't redirect
  const randomNumber = createAsync(() => getRandomNumber());

  const regenerateNumber = useAction(regenerate);
  return (
    <main>
      <Title>Hello World</Title>
      <h2>Random number: {randomNumber()}</h2>
      <button onClick={() => regenerateNumber()}>Regenerate</button>
    </main>
  );
}
