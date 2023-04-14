"use client";

import { PropsWithChildren, useEffect, useState } from "react";

// Use to avoid problem with hydration

const ClientOnly = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
