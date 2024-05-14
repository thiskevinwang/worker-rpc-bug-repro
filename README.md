This is repro for errors like:

```console
The RPC receiver does not implement the method "<METHOD NAME>".
```

Notes:

- `worker-a` is the host worker
- `worker-b` is a service binding / RPC receiver
- This has only been observed in deployed environments.
- `worker-a` calls `worker-b` over RPC, inside `waitUntil`
