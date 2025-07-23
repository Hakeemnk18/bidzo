export interface GoogleProfile {
  sub: string;
  email: string;
  name: string;
}

export const fetchGoogleProfile = async (token: string): Promise<GoogleProfile> => {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Invalid Google token");

  return await res.json();
};