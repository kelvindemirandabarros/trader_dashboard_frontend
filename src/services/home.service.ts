// Services:
import api from './api';

// Consts:
import { backend_url } from '@/consts/App';

export async function get_home_response() {
  const home_response = await api.get(backend_url!, {
    timeout: 70000
  });

  return home_response;
}
