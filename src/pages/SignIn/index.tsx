import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Backgroud } from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('E-mail inválido'),
                    password: Yup.string().required('Senha obrigatória'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({
                    email: data.email,
                    password: data.password,
                });

                addToast({
                    type: 'success',
                    title: 'Usuário logado',
                    description: `Olá, seja bem vindo ao GoBarber`,
                });

                history.push('/dashboard');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);

                    return;
                }
                // Disparar um Toast Message
                addToast({
                    type: 'error',
                    title: 'Erro na autenticação',
                    description:
                        'Ocorreu um erro ao fazer o logon, verifique as credências.',
                });
            }
        },
        [signIn, addToast, history],
    );

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça o seu logon</h1>
                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Senha"
                        />
                        <Button type="submit">Entrar</Button>
                        <a href="forgot">esqueci minha senha</a>
                    </Form>
                    <Link to="/signup">
                        <FiLogIn />
                        criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Backgroud />
        </Container>
    );
};

export default SignIn;
