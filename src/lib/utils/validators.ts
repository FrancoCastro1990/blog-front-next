import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const postSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es obligatorio')
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(200, 'El título no puede exceder 200 caracteres'),
  content: z
    .string()
    .min(1, 'El contenido es obligatorio')
    .min(50, 'El contenido debe tener al menos 50 caracteres'),
  author: z
    .string()
    .min(1, 'El autor es obligatorio')
    .min(2, 'El nombre del autor debe tener al menos 2 caracteres'),
});

export const updatePostSchema = z.object({
  title: z
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(200, 'El título no puede exceder 200 caracteres')
    .optional(),
  content: z
    .string()
    .min(50, 'El contenido debe tener al menos 50 caracteres')
    .optional(),
  author: z
    .string()
    .min(2, 'El nombre del autor debe tener al menos 2 caracteres')
    .optional(),
});

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeMarkdown = (content: string): string => {
  // Basic sanitization for markdown content
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

export type LoginFormData = z.infer<typeof loginSchema>;
export type PostFormData = z.infer<typeof postSchema>;
export type UpdatePostFormData = z.infer<typeof updatePostSchema>;