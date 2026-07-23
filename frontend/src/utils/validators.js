/**
 * Production-grade validation utilities for EduSphere SaaS
 */

export const validateEmail = (email) => {
  if (!email || !email.trim()) return "Email address is required.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.trim())) return "Please enter a valid email address (e.g. user@school.edu.lk).";
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) return "Phone number is required.";
  const cleaned = phone.replace(/[\s\-()]/g, '');
  // Matches Sri Lankan & international formats (+94 77 123 4567, 0771234567, etc.)
  const re = /^(?:\+94|0)?[1-9][0-9]{8}$|^\+?[0-9]{9,15}$/;
  if (!re.test(cleaned)) return "Please enter a valid phone number (e.g. +94 77 123 4567 or 0771234567).";
  return null;
};

export const validateNIC = (nic) => {
  if (!nic || !nic.trim()) return null; // Optional if empty
  const cleaned = nic.trim();
  // Old NIC format (9 digits + V/X) or New NIC format (12 digits)
  const re = /^[0-9]{9}[vVxX]$|^[0-9]{12}$/;
  if (!re.test(cleaned)) return "Invalid NIC format (Old: 9 digits + V/X, e.g. 847291038V or New: 12 digits).";
  return null;
};

export const validateName = (name, fieldName = "Name") => {
  if (!name || !name.trim()) return `${fieldName} is required.`;
  if (name.trim().length < 2) return `${fieldName} must be at least 2 characters long.`;
  const re = /^[a-zA-Z\s\.\-']+$/;
  if (!re.test(name.trim())) return `${fieldName} can only contain letters, spaces, hyphens, or dots.`;
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters long.";
  return null;
};

export const validateMarks = (marks) => {
  const num = Number(marks);
  if (isNaN(num)) return "Marks must be a valid number.";
  if (num < 0 || num > 100) return "Marks must be between 0 and 100.";
  return null;
};
