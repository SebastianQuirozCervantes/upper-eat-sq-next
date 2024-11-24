const URL = 'https://upper-eat-sq.onrender.com/api'

export async function fetchBookingsByUser() {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${URL}/booking`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log({data})
      return data;
    } else {
      const error = await response.json();
      console.error('Error:', error.message);
      return []
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookings by user.');
  }
}

export async function fetchPlacesInUserNotHaveBooking() {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${URL}/place`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log({data})
      return data;
    } else {
      const error = await response.json();
      console.error('Error:', error.message);
      return []
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookings by user.');
  }
}

export async function deleteBookingById(id: number){
  const token = localStorage.getItem('token')
  const response = await fetch(`${URL}/booking/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

export async function fetchGeneralDashboard(){
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${URL}/general/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log({data})
      return data;
    } else {
      const error = await response.json();
      console.error('Error:', error.message);
      return []
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookings by user.');
  }
}

export async function createBooking(data: { numberOfPeople: number; date: string; hour: string, placeId: number | undefined }){
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${URL}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      console.log({data})
      return data;
    } else {
      const error = await response.json();
      console.error('Error:', error.message);
      return []
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookings by user.');
  }
}

export async function signIn(email: string, password: string){
  try{
    const response = await fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log({data})
    if (response.ok) {
      localStorage.setItem('token', data.token);
      return response.ok
    } else {
      return null
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookings by user.');
  }
}