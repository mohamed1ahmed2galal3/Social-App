import React from 'react'
import {Card, Skeleton} from "@heroui/react";


export default function Loading() {
  return <>
    <Card className="flex-1 justify-center m-auto w-xl py-10 px-4 space-y-5 p-4 mt-3" radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300" />
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
            <div className="flex-1 justify-center m-auto w-xl py-5 px-4 flex items-center gap-3">
            <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
            </div>
        </Card>
        
  </>
}
