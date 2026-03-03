"use client";
import React, { Suspense } from 'react';
import { SignInPage } from "@/app/components/login-ui";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SignInPage />
    </Suspense>
  );
}
