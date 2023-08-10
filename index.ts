// @ts-ignore
import { AxiosError } from 'axios'
// @ts-ignore
import router from '@/router'
// @ts-ignore
import { useToast } from 'vue-toastification'
// @ts-ignore

import i18n from '@/plugins/i18n'

const { t } = i18n.global

const toast = useToast()

// Function to handle error
export function handleError(error: AxiosError) {
  return new Promise((resolve, reject) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('mangosteenToken');
        localStorage.removeItem('accessToken');

        router.push('/sign-in').then(() => {
          toast.info(t('sign-in.login-expired'));
        });
      } else {
        toast.error(error.response.data.message);
        reject(error);
      }
    } else {
      toast.error(t('http-status-error.network-error'));
    }
  });
}
