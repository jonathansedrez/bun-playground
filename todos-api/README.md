To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

---

- NGINX: nginx ("engine x") is an HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server.
- round-robin: Load balancer strategy. If 6 requests arrive, the round-robin sequence would be:
  Request 1 → Replica A
  Request 2 → Replica B
  Request 3 → Replica C
  Request 4 → Replica A
  Request 5 → Replica B
  Request 6 → Replica C
- The basic load balancing strategy in Nginx is round-robin, which is enabled by default when you define multiple servers in an upstream block.
- minikube: is local Kubernetes, focusing on making it easy to learn and develop for Kubernetes.