import React from 'react'
import { Card, Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <Card
      className="
        w-full max-w-xl
        mx-auto
        py-6 sm:py-8
        px-3 sm:px-4
        space-y-5
        mt-3
      "
      radius="lg"
    >
      <Skeleton className="rounded-lg">
        <div className="h-20 sm:h-24 rounded-lg bg-default-300" />
      </Skeleton>

      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>

        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>

        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>

      <div className="flex items-center gap-3 pt-3">
        <Skeleton className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12" />

        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
    </Card>
  );
}
