"use client";

import { useState } from "react";
import { Code } from "./ui/typography";
import { Collapse, Switch } from "@mui/material";

export function TagExample() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <h2>
        <Switch checked={open} onChange={() => setOpen(!open)} size="small" /> Examples
      </h2>
      <Collapse in={open} unmountOnExit>
        <ul className="list-disc pl-6">
          <li>
            <p>
              To look at PROFESSOR DATO&apos; IR. DR. MOHD HAMDI BIN ABD SHUKOR
              &apos;s profile, google his UMExpert page:
            </p>
            <Code>https://umexpert.um.edu.my/hamdi</Code>
            <p>
              Hence, his tag is <Code>hamdi</Code>.
            </p>
          </li>
          <li>
            <p>
              If you know their email, the tag is its prepend. PROFESSOR DATO&apos;
              IR. DR. MOHD HAMDI BIN ABD SHUKOR &apos;s email is:
            </p>
            <Code>hamdi@um.edu.my</Code>
            <p>
              Hence, his tag is <Code>hamdi</Code>.
            </p>
          </li>
        </ul>
      </Collapse>
    </div>
  );
}
