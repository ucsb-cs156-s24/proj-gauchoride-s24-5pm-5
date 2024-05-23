import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
export const space = " ";

export default function Footer() {
  const [repoUrl, setRepoUrl] = useState("");
  useEffect(() => { 
    fetch("/api/systemInfo")
      .then((res) => res.json())
      .then((data) => {
        setRepoUrl(data.sourceRepo);
      });
  }, []);
  return (
    <footer className="bg-light pt-3 pt-md-4 pb-4 pb-md-5">
      <Container>
        <p>
          This app is a class project of{space}
          <a
            data-testid="footer-class-website-link"
            href="https://ucsb-cs156.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            CMPSC 156
          </a>
          {space}
          at
          {space}
          <a data-testid="footer-ucsb-link" href="https://ucsb.edu" target="_blank" rel="noopener noreferrer">
            UCSB
          </a>
          . Check out the source code on
          {space}
          <a
            data-testid="footer-source-code-link"
            href={repoUrl}
            // use api/systemInfo to get the repo URL
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>

        <p>
          See our{space}
          <a
          href="/privacy.html"
          >
            privacy policy
          </a>

        </p>

        <p>
          The cartoon Storke Tower images in the brand logo and favicon for this site were
          developed by Chelsea Lyon-Hayden, Art Director for UCSB Associate Students, and are
          used here by permission of the Executive Director of UCSB Associated Students.
          These images are Copyright © 2021 UCSB Associated Students, and may not be reused
          without express written permission of the Executive Director of UCSB Associated Students.  For more info, visit:
          {space}
          <a data-testid="footer-sticker-link" href="https://www.as.ucsb.edu/sticker-packs">www.as.ucsb.edu/sticker-packs/</a>
          .
        </p>
      </Container>
    </footer>
  );
}