export const required = value => String(value ?? "").trim().length > 0;
export const isEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
export const isPhone = value => /^[6-9]\d{9}$/.test(String(value).replace(/\D/g, ""));
export const isPositiveNumber = value => Number.isFinite(Number(value)) && Number(value) > 0;
