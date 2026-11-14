import { Container, Heading, Lede, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="grid min-h-[70dvh] content-center gap-6 py-24">
      <p className="t-label">404</p>
      <Heading level="display" as="h1" className="max-w-[14ch]">
        That page is not here.
      </Heading>
      <Lede>The link may be old or mistyped. Start from the home page, or see what the app does.</Lede>
      <div className="flex flex-wrap gap-4">
        <Button href="/">Back to home</Button>
        <Button href="/features" variant="secondary">
          See features
        </Button>
      </div>
    </Container>
  );
}
