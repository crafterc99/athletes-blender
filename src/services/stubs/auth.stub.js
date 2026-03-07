const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

const USERS_KEY = 'ab_users';
const SESSION_KEY = 'ab_session';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
}

function saveSession(session) {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export async function login(email, password) {
  await delay();
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  const { password: _, ...safeUser } = user;
  const token = 'stub_token_' + Date.now();
  saveSession({ user: safeUser, token });
  return { user: safeUser, token };
}

export async function register({ firstName, lastName, email, password }) {
  await delay();
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error('An account with this email already exists');
  }
  const user = {
    id: 'user_' + crypto.randomUUID().slice(0, 8),
    firstName,
    lastName,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  const { password: _, ...safeUser } = user;
  const token = 'stub_token_' + Date.now();
  saveSession({ user: safeUser, token });
  return { user: safeUser, token };
}

export async function logout() {
  await delay(200);
  saveSession(null);
}

export async function getCurrentUser() {
  await delay(200);
  const session = getSession();
  if (!session) return null;
  return session;
}

export async function resetPassword(email) {
  await delay();
  const users = getUsers();
  if (!users.find((u) => u.email === email)) {
    throw new Error('No account found with this email');
  }
  return { success: true };
}

export async function updateProfile(userId, updates) {
  await delay();
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error('User not found');
  users[idx] = { ...users[idx], ...updates };
  saveUsers(users);
  const { password: _, ...safeUser } = users[idx];
  const session = getSession();
  if (session) saveSession({ ...session, user: safeUser });
  return safeUser;
}

export async function changePassword(userId, currentPassword, newPassword) {
  await delay();
  const users = getUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('User not found');
  if (user.password !== currentPassword) throw new Error('Current password is incorrect');
  user.password = newPassword;
  saveUsers(users);
  return { success: true };
}
