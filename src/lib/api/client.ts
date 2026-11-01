import { env } from "@/config/env";

/**
 * Minimal typed fetch wrapper for the backend API.
 *
 * - Auth is cookie based (`credentials: "include"`, httpOnly cookies set by the API).
 *   Tokens are never stored in JavaScript.
 * - JSON in, JSON out.
 * - 15 s timeout via `AbortSignal.timeout`.
 * - Non-2xx responses throw a typed `ApiError`.
 */

export const API_TIMEOUT_MS = 15_000;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiOptions<TBody = unknown> extends Omit<RequestInit, "body" | "method"> {
  method?: HttpMethod;
  body?: TBody;
  /** Override the default 15 s timeout. */
  timeoutMs?: number;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string | undefined;
  readonly details: unknown;

  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }
}

interface ErrorBody {
  message?: string;
  code?: string;
  details?: unknown;
}

async function parseBody<T>(response: Response): Promise<T | undefined> {
  if (response.status === 204) return undefined;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return undefined;
  return (await response.json()) as T;
}

export async function api<TResponse, TBody = unknown>(
  path: string,
  options: ApiOptions<TBody> = {},
): Promise<TResponse> {
  const { method = "GET", body, timeoutMs = API_TIMEOUT_MS, headers, signal, ...rest } = options;

  const url = path.startsWith("http") ? path : `${env.NEXT_PUBLIC_API_URL}${path}`;

  const response = await fetch(url, {
    ...rest,
    method,
    credentials: "include",
    signal: signal ?? AbortSignal.timeout(timeoutMs),
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorBody = await parseBody<ErrorBody>(response).catch(() => undefined);
    throw new ApiError(
      errorBody?.message ?? `Request failed with status ${response.status}`,
      response.status,
      errorBody?.code,
      errorBody?.details,
    );
  }

  return (await parseBody<TResponse>(response)) as TResponse;
}
