export interface AuthResult {
  username: string;
}

export async function signupRequest(
  name: string,
  email: string,
  password: string,
): Promise<AuthResult> {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? 'Signup failed');
  }
  return res.json();
}

export async function loginRequest(
  email: string,
  password: string,
): Promise<AuthResult> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? 'Login failed');
  }
  return res.json();
}
