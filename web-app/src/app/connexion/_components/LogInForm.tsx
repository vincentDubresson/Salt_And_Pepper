import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginFormTypes } from '../_lib/FormTypes';
import { useMutation } from '@apollo/client';
import { LOGIN_CHECK_USER } from '@/app/_lib/_queries/User';

export default function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormTypes>();

  const [logIn, { loading }] = useMutation(LOGIN_CHECK_USER, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const onSubmit: SubmitHandler<LoginFormTypes> = (data) => {
    logIn({
      variables: {
        email: data.email,
        plainPassword: data.plainPassword,
      },
    });
  };

  return (
    <>
      <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="block text-sm lg:text-base font-medium leading-6 text-gray-500">
            Adresse e-mail
          </label>
          <input
            className="block w-full border-b-2 px-2.5 py-2.5 bg-sp-primary-50 transition-colors border-b-sp-primary-400 hover:border-b-sp-primary-300 focus:border-b-sp-primary-300 shadow-sm outline-none"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="text-xs lg:text-sm text-red-600">
              L&lsquo;adresse e-mail est obligatoire
            </span>
          )}
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm lg:text-base font-medium leading-6 text-gray-500">
              Mot de passe
            </label>
            <div className="">
              <a
                href="#"
                className="font-semibold text-sm lg:text-base text-sp-primary-400 hover:text-sp-primary-300 transition-colors "
              >
                Mot de passe oublié ?
              </a>
            </div>
          </div>
          <input
            className="block w-full border-b-2 px-2.5 py-2.5 bg-sp-primary-50 transition-colors border-b-sp-primary-400 hover:border-b-sp-primary-300 focus:border-b-sp-primary-300 shadow-sm outline-none"
            {...register('plainPassword', { required: true })}
          />
          {errors.plainPassword && (
            <span className="text-xs lg:text-sm text-red-600">
              Le mot de passe est obligatoire
            </span>
          )}
        </div>

        <div>
          <button
            className="flex m-auto mt-10 justify-center rounded-full bg-sp-primary-400 px-3.5 py-2 text-sm lg:text-base font-semibold leading-6 text-white shadow-sm transition-colors  hover:bg-sp-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            Se connecter
          </button>
        </div>
      </form>
    </>
  );
}
