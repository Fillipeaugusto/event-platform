import { gql, useMutation } from '@apollo/client';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { useCreateSubscriberMutation } from '../graphql/generated';
import BgImageMockup from '/src/assets/code-mockup.png';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

type FormProps = {
	name: string;
	email: string;
};

const schema = yup.object({
	name: yup.string().required('Nome é obrigatório'),
	email: yup.string().email().required('E-mail é obrigatório'),
});

export function Subscribe() {
	const navigate = useNavigate();

	const [createSubscriber, { loading }] = useCreateSubscriberMutation();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormProps>({
		resolver: yupResolver(schema),
	});

	async function handleSubscribe(data: FormProps) {
		const notificationToast = toast.loading('Enviando seus dados');
		await new Promise((resolve) => setTimeout(resolve, 2000));
		try {
			createSubscriber({
				variables: {
					name: data.name,
					email: data.email,
				},
			});
			toast.success('Conta criada com sucesso', {
				id: notificationToast,
			});
		} catch (e) {
			console.log(e);
			toast.error('Não foi possivel criar a sua conta', {
				id: notificationToast,
			});
		}
		navigate('/event');
	}

	return (
		<div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
			<div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto bg-react  bg-contain bg-no-repeat bg-center">
				<div className="max-w-[640px]">
					<Logo />
					<h1 className="mt-8 text-[2.5rem] leading-tight">
						Construa uma <strong className="text-blue-500">aplicação completa</strong>
						, do zero, com <strong className="text-blue-500">React</strong>
					</h1>
					<p className="mt-4 text-gray-200 leading-relaxed">
						Em apenas uma semana você vai dominar na prática uma das tecnologias mais
						utilizadas e com alta demanda para acessar as melhores oportunidades do
						mercado.
					</p>
				</div>
				<div className="p-8 bg-gray-700 border border-gray-500 rounded">
					<strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>
					<form
						className="flex flex-col gap-2 w-full"
						onSubmit={handleSubmit(handleSubscribe)}
					>
						<input
							className="bg-gray-900 rounded px-5 h-14"
							type="text"
							placeholder="Seu nome completo"
							// onChange={(e) => setName(e.target.value)}
							{...register('name')}
						/>
						{errors.name && <span>{errors.name?.message}</span>}
						<input
							className="bg-gray-900 rounded px-5 h-14 "
							type="email"
							placeholder="Digite seu e-mail"
							// onChange={(e) => setEmail(e.target.value)}
							// value={email}
							{...register('email')}
						/>
						{errors.email && <span>{errors.email?.message}</span>}
						<button
							type="submit"
							disabled={isSubmitting}
							className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
						>
							Garantir minha vaga
						</button>
					</form>
				</div>
			</div>
			<img src={BgImageMockup} alt="" className="mt-10" />
		</div>
	);
}
