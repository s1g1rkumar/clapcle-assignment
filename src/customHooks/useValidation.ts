import { useState, useCallback } from "react";
import { validationSchema } from "../helpers/validationSchema";

export const useValidation = () => {
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  const validateField = useCallback((field: string, value: string) => {
    let validationKey = field;
    if (field.includes("[") && field.includes("].")) {
      validationKey = field.replace(/\[\d+\]/g, "[]");
    }
    const rules = validationSchema[validationKey];
    if (!rules) return;
    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }));
        return error;
      }
    }

    setErrors((prev) => ({ ...prev, [field]: undefined }));
    return undefined;
  }, []);

  const validateForm = useCallback((state: any) => {
    const tempErrors: { [key: string]: string | undefined } = {};

    Object.keys(validationSchema).forEach((key) => {
      if (key.includes("[]")) {

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
              tempErrors[indexedKey] = error;
              return;
            }
          }
        });
      } else {

        const rules = validationSchema[key];
        if (!rules) return;

        for (const rule of rules) {
          const error = rule(state[key]);
          if (error) {
            tempErrors[key] = error;
            break;
          }
        }
      }
    });

    setErrors(tempErrors);

    return tempErrors;
  }, []);

  return { errors, validateField, validateForm, setErrors };
};