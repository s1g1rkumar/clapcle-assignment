// useValidation.ts

import { useState, useCallback } from "react";
import { validationSchema } from "../helpers/validationSchema";

export const useValidation = () => {
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  const validateField = useCallback((field: string, value: string) => {
    // 1. Determine the validation key (un-indexed)
    let validationKey = field;
    const errorKey = field; // Key to set in the errors state

    // Check if the field is an indexed array element (e.g., 'bankAccounts[0].bankName')
    if (field.includes("[") && field.includes("].")) {
      // Extract the un-indexed key (e.g., 'bankAccounts[].bankName')
      validationKey = field.replace(/\[\d+\]/g, "[]");
    }

    const rules = validationSchema[validationKey];
    if (!rules) return;

    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        // Use the original field (indexed key) to set the error
        setErrors((prev) => ({ ...prev, [errorKey]: error }));
        return error;
      }
    }

    // Clear error using the original field (indexed key)
    setErrors((prev) => ({ ...prev, [errorKey]: undefined }));
    return undefined; // Ensure a consistent return type
  }, []);

  // ✅ FIX APPLIED HERE: Collect errors locally, then set state synchronously.
  const validateForm = useCallback((state: any) => {
    const tempErrors: { [key: string]: string | undefined } = {};
    let valid = true;

    // Iterate through validation schema keys
    Object.keys(validationSchema).forEach((key) => {
      if (key.includes("[]")) {
        // --- Logic for Array/Indexed Fields (e.g., addresses, bankAccounts) ---

        const fullKeyParts = key.split(".");
        if (fullKeyParts.length < 2) return;

        const [base, fieldName] = fullKeyParts;
        const baseName = base.replace("[]", "");
        const arr = state[baseName];

        arr?.forEach((item: any, index: number) => {
          const rules = validationSchema[key];
          if (!rules) return;

          const value = item[fieldName];
          const indexedKey = `${baseName}[${index}].${fieldName}`;

          for (const rule of rules) {
            const error = rule(value);
            if (error) {
              valid = false;
              // ➡️ Add error to the local tempErrors object
              tempErrors[indexedKey] = error;
              return;
            }
          }
        });
      } else {
        // --- Logic for Standard Fields (e.g., panNo, legalName) ---

        const rules = validationSchema[key];
        if (!rules) return;

        for (const rule of rules) {
          const error = rule(state[key]);
          if (error) {
            valid = false;
            // ➡️ Add error to the local tempErrors object
            tempErrors[key] = error;
            break;
          }
        }
      }
    });

    // 1. Set the state with ALL collected errors. 
    // This triggers a UI update to show the errors.
    setErrors(tempErrors);

    // 2. Return the synchronous result immediately.
    // This result is what your handleSubmit checks.
    return tempErrors;
  }, []);

  return { errors, validateField, validateForm, setErrors };
};