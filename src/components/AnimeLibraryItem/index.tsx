import React, { FC } from 'react'
import { Typography } from 'antd'
import { NavLink } from 'react-router-dom'

import styles from './styles.module.scss'
import { ANILIBRIA_URI } from 'dotenv'
import { encodeAnimeName } from 'helpers/encodeAnimeName'
import { AddToList } from 'components/AddToList'
import { Title } from 'api/anilibriaApi/types'

interface AnimeLibraryItemProps {
	title: Title
}

export const AnimeLibraryItem: FC<AnimeLibraryItemProps> = ({ title }) => {
	const maxDescriptionLenght = 200

	const animeName = encodeAnimeName(title.names.ru)

	return (
		<div
			className={styles.animeLibraryItemWrapper}
			style={{
				background: `url("${
					ANILIBRIA_URI + title.posters.original.url
				}") 0 0/ 100% 100%`
			}}
		>
			<div className={styles.animeLibraryItemContainer}>
				<Typography.Title level={4}>
					<NavLink to={`/titles/${animeName}`}>
						{title.names.ru || title.names.en}
					</NavLink>
				</Typography.Title>
				<div>
					<Typography.Paragraph style={{ lineHeight: '15px' }}>
						{title?.description?.slice(0, maxDescriptionLenght)}
						{title?.description?.length > 300 ? '...' : ''}
					</Typography.Paragraph>
					<AddToList animeName={title.names.ru} />
				</div>
			</div>
		</div>
	)
}
