import React from 'react'
import { Button, Form, Input, notification, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'
import { DefaultLayout } from 'layouts/DefaultLayout'
import { useAppSelector } from 'hooks/useAppSelector'
import { registrationThunk } from '../../store/reducers/landingReducer/landingThunks'

export const Registration: React.FC = () => {
	const navigate = useNavigate()

	const dispatch = useDispatch()
	const registrationError = useAppSelector(
		state => state.landing.registrationError
	)

	const onFinish = (values: any) => {
		const user = {
			login: values.name,
			email: values.email,
			password: values.password
		}
		dispatch(registrationThunk(user))

		setTimeout(() => {
			if (registrationError === 'success') {
				notification.success({
					placement: 'top',
					message: 'Успешно!',
					description: 'Регистрация прошла успешно!',
					duration: 1
				})
				return navigate('/login')
			}
			if (registrationError) {
				notification.error({
					placement: 'top',
					message: 'Ошибка!',
					description: 'Проверьте введённые данные',
					duration: 1.5
				})
			}
		}, 400)
	}

	return (
		<DefaultLayout>
			<Form
				name='basic'
				onFinish={onFinish}
				autoComplete='off'
				style={{ width: '100%' }}
			>
				<Typography.Title level={4} style={{ color: 'white' }}>
					Регистрация
				</Typography.Title>
				<Form.Item
					name='name'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, введите свой ник!'
						}
					]}
					style={{ margin: '0 0 10px 0' }}
				>
					<Input placeholder='Никнейм' />
				</Form.Item>
				<Form.Item
					name='email'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, введите свою электронную почту!'
						}
					]}
					style={{ margin: '0 0 10px 0' }}
				>
					<Input placeholder='Электронная почта' />
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{ required: true, message: 'Пожалуйста, введите свой пароль!' }
					]}
				>
					<Input.Password placeholder='Пароль' />
				</Form.Item>
				<div className={styles.loginOrRestorePassword}>
					<Link to='/restore-password'>Забыли пароль?</Link>
					<Link to='/login'>Логин</Link>
				</div>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Зарегестрироваться
					</Button>
				</Form.Item>
			</Form>
		</DefaultLayout>
	)
}
