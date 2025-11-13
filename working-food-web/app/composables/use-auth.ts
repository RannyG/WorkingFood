import type { JwtPayload } from "~/core/models/interfaces/jwt-payload";

export const useAuth = () => {
  const user = useState<JwtPayload | null>("user", () => null);

  function setUser(newUser: JwtPayload) {
    user.value = newUser;
  }

  function logout() {
    user.value = null;
    navigateTo("/login");
    localStorage.clear();
  }

  return {
    user,
    setUser,
    logout,
  };
};
