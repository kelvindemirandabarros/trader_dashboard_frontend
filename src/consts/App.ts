export const is_production_env = process.env.NODE_ENV === 'production';

export const app_name = 'Trader Dashboard';

export const storage_user_string = 'trader:user';

export const public_paths = ['/login', '/forgot-password'];

export const backend_url = is_production_env
  ? process.env.NEXT_PUBLIC_API_URL
  : 'http://localhost:3000';
