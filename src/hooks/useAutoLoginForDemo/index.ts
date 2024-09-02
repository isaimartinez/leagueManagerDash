import { useCallback, useEffect, useState } from "react";

import { authProvider } from "@/providers";
const emails = [
  "michael.scott@dundermifflin.com",
  "jim.halpert@dundermifflin.com",
  "pam.beesly@dundermifflin.com",
  "dwight.schrute@dundermifflin.com",
  "angela.martin@dundermifflin.com",
  "stanley.hudson@dundermifflin.com",
  "phyllis.smith@dundermifflin.com",
  "kevin.malone@dundermifflin.com",
  "oscar.martinez@dundermifflin.com",
  "creed.bratton@dundermifflin.com",
  "meredith.palmer@dundermifflin.com",
  "ryan.howard@dundermifflin.com",
  "kelly.kapoor@dundermifflin.com",
  "andy.bernard@dundermifflin.com",
  "toby.flenderson@dundermifflin.com",
];
/**
 * This hook is used to automatically login the user.
 * We use this hook to skip the login page and demonstrate the application more quickly.
 */
export const useAutoLoginForDemo = () => {
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async () => {
    const email = localStorage.getItem("auto_login") || emails[0];
    try {
      await authProvider.login({
        email,
      });
    } catch (_error) {
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    const shouldLogin = localStorage.getItem("auto_login") !== "false";
    if (!shouldLogin) {
      setIsLoading(false);
      return;
    }

    login();
  }, []);

  return { loading: isLoading };
};

/**
 *  Enable auto login feature.
 *  This is used to skip the login page and demonstrate the application more quickly.
 */
export const enableAutoLogin = (email: string) => {
  localStorage.setItem("auto_login", email);
};

/**
 *  Disable auto login feature.
 *  This is used to skip the login page and demonstrate the application more quickly.
 */
export const disableAutoLogin = () => {
  localStorage.setItem("auto_login", "false");
};
