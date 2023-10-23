import React from 'react';
import {useLocation} from 'react-router-dom';
import styled, { css } from 'styled-components';

const NAV_ITEMS = [
	{
		name: '홈',
		href: '/'
	},
	{
		name: '글쓰기',
		href: '/posts/new'
	},
	{
		name: '게시글',
		href: '/posts'
	},
	{
		name: '프로필',
		href: '/profile'
	},
];

const HeaderBar = () => {
	const { pathname } = useLocation();

	return (
		<Header>
			{NAV_ITEMS.map(({name, href}) => {
				return (
					<Box
						key={name}
						href={href}
						$active={pathname === href}
					>
						{name}
					</Box>
				)
			})}
		</Header>
	);
}

interface BoxProps {
	$active: boolean;
}

const Box = styled.a<BoxProps>`
	${(props) => 
		props.$active && 
		css`background-color: #efefef`};
	border-radius: 8px;
	display: flex;
	align-items: center;
	padding: 0 15px;
`

const Header = styled.header`
	position: sticky;
	top: 0;
	z-index: 100;
	background: #ffffff;
	display: flex;
	width: 100%;
	justify-content: flex-end;
	align-content: center;
	height: 55px;
	padding: 4px 15px;
	border-bottom: 1px solid #efefef;
`;

export default HeaderBar;