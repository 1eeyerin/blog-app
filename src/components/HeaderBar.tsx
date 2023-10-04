import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import {useNavigate} from 'react-router-dom';

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
	const navigate = useNavigate();

	const onChangeMenu = (href: string) => {
		navigate(href);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<List sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end'}}>
						{NAV_ITEMS.map(({name, href}) => (
							<ListItem key={name} onClick={() => onChangeMenu(href)} disablePadding>
								<ListItemButton sx={{ textAlign: 'center' }}>
									<ListItemText primary={name} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default HeaderBar;