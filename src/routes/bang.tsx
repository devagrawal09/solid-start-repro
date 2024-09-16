import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

export default function Bang() {
  return (
    <main>
      <Title>Bang</Title>
      <h1>You got a number less than 0.5!</h1>
      <A href="/">Try again</A>
    </main>
  );
}
