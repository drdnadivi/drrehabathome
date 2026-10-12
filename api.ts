import { Blog, Patient, Session, Exercise, Booking, SystemStats, User } from './types';

const BASE_URL = '/api';

export async function fetchStats(): Promise<SystemStats> {
  const res = await fetch(`${BASE_URL}/stats`);
  if (!res.ok) throw new Error('Failed to fetch system stats');
  return res.json();
}

export async function fetchBlogs(params?: { category?: string; search?: string; tag?: string }): Promise<Blog[]> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.tag) query.append('tag', params.tag);

  const res = await fetch(`${BASE_URL}/blogs?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

export async function fetchBlogByIdOrSlug(idOrSlug: string): Promise<Blog> {
  const res = await fetch(`${BASE_URL}/blogs/${idOrSlug}`);
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
}

export async function createBlog(data: Partial<Blog>): Promise<Blog> {
  const res = await fetch(`${BASE_URL}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create blog');
  return res.json();
}

export async function updateBlog(id: string, data: Partial<Blog>): Promise<Blog> {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update blog');
  return res.json();
}

export async function deleteBlog(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete blog');
  return res.json();
}

export async function addBlogComment(id: string, author: string, text: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/blogs/${id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author, text }),
  });
  if (!res.ok) throw new Error('Failed to add comment');
  return res.json();
}

export async function fetchPatients(): Promise<Patient[]> {
  const res = await fetch(`${BASE_URL}/patients`);
  if (!res.ok) throw new Error('Failed to fetch patients');
  return res.json();
}

export async function fetchPatientById(id: string): Promise<Patient> {
  const res = await fetch(`${BASE_URL}/patients/${id}`);
  if (!res.ok) throw new Error('Failed to fetch patient details');
  return res.json();
}

export async function fetchSessions(params?: { patientId?: string; status?: string }): Promise<Session[]> {
  const query = new URLSearchParams();
  if (params?.patientId) query.append('patientId', params.patientId);
  if (params?.status) query.append('status', params.status);

  const res = await fetch(`${BASE_URL}/sessions?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch sessions');
  return res.json();
}

export async function logSessionOutcome(data: Partial<Session>): Promise<Session> {
  const res = await fetch(`${BASE_URL}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to log session');
  return res.json();
}

export async function reviewSessionOutcome(id: string, reviewData: { pmrDoctorNotes: string; pmrDoctorAction: string; doctorName?: string }): Promise<Session> {
  const res = await fetch(`${BASE_URL}/sessions/${id}/review`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  if (!res.ok) throw new Error('Failed to review session');
  return res.json();
}

export async function toggleExercise(id: string): Promise<Exercise> {
  const res = await fetch(`${BASE_URL}/exercises/${id}/toggle`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Failed to toggle exercise');
  return res.json();
}

export async function fetchBookings(): Promise<Booking[]> {
  const res = await fetch(`${BASE_URL}/bookings`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}

export async function createBooking(data: Partial<Booking>): Promise<Booking> {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create booking');
  return res.json();
}

export async function updateBookingStatus(id: string, status: string): Promise<Booking> {
  const res = await fetch(`${BASE_URL}/bookings/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update booking status');
  return res.json();
}

export async function loginUser(email: string, password?: string): Promise<{ token: string; user: User }> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Invalid email or password');
  return res.json();
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function resetDatabase(): Promise<any> {
  const res = await fetch(`${BASE_URL}/reset`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to reset database');
  return res.json();
}

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  role: string;
  title?: string;
  phone?: string;
  credentials?: string;
  registrationNo?: string;
}): Promise<User> {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create user');
  }
  return res.json();
}

export async function updateUser(id: string, data: Record<string, any>): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}

export async function enrollBooking(
  bookingId: string,
  data: Record<string, any> = {}
): Promise<{ patient: Patient; booking: Booking; patientUser: User | null }> {
  const res = await fetch(`${BASE_URL}/bookings/${bookingId}/enroll`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to enroll patient');
  }
  return res.json();
}
