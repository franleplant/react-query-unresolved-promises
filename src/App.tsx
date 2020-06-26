import React from 'react';
import {useQuery, useMutation, queryCache, QueryResult} from 'react-query'

export default function App() {
  const [mutate, {status}] = useSomeMutation()
  const loading = status === "loading"
console.log("mother fucker")

  return (
    <div>
      <button type="button" disabled={loading} onClick={() => mutate()}>
        {loading ? "loading..." : "Submit"}
      </button>
    </div>
  );
}


export function useSomeMutation() {
  return useMutation<void, undefined>(async () => {
    await delay()
  }, {
    onSuccess: async () => {
      console.log("onSuccess start")
      queryCache.setQueryData("notInstantiated", "hello")
      queryCache.setQueryData("notInstantiated2", "hello")
      const a = queryCache.refetchQueries("notInstantiated", {force:true})
      const b = queryCache.refetchQueries("notInstantiated2", {force:true})
      console.log("promises are never resolved", a, b)
      await Promise.all([a,b])
      // This never reaches
      console.log("onSuccess end")
    }
  })
}

export function delay(time: number = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time))
}
