/**
 * Date and UI formatters for EduSphere SaaS
 */

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const getStatusBadgeVariant = (status) => {
  const normalized = String(status || '').toLowerCase();
  switch (normalized) {
    case 'active':
    case 'present':
    case 'published':
    case 'completed':
    case 'success':
    case 'passed':
      return 'success';
    case 'inactive':
    case 'absent':
    case 'failed':
    case 'cancelled':
    case 'disabled':
      return 'danger';
    case 'late':
    case 'ongoing':
    case 'pending':
    case 'warning':
    case 'on leave':
      return 'warning';
    case 'excused':
    case 'scheduled':
    case 'draft':
    case 'info':
    case 'archived':
      return 'info';
    default:
      return 'neutral';
  }
};

export const getGradeBadgeVariant = (grade) => {
  if (['A+', 'A'].includes(grade)) return 'success';
  if (['B', 'C'].includes(grade)) return 'info';
  if (grade === 'S') return 'warning';
  if (grade === 'F') return 'danger';
  return 'neutral';
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
