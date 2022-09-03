import { useState, ReactNode } from 'react'
import styled from 'styled-components'
import { useInput } from '../../hooks/useInput'

const StyledSearch = styled.div`
	position: relative;
	width: ${(props: Iprops) => props.isActive ? '85%' : '35px'};
	height: 35px;
	border-radius: 35px;
	background: #fff;
	transition: 0.5s;
	overflow:hidden;

	& div{
	position: absolute;
	width: 35px;
	height: 35px;
	border-radius: 35px;
	background: #fff;
	transition: 0.5s;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	}

	& div::before{
		content: '';
		position: absolute;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		border: 2px solid #0690fd;
		transform: translate(-2.5px,-2.5px);
	}

	& div::after{
		content: '';
		position: absolute;
		width: 2px;
		height: 8px;
		background: #0690fd;
		transform: translate(4px,4px) rotate(315deg);
	}

	& .search {
		position: relative;
		width: calc(100% - 40px);
		height: 100%;
		left: 30px;
		display: flex;
		justify-content: space-betwin;
		align-items: center;
	}

	& .search input {
		position: absolute;
		top: 1px;
		width: calc(100% - 20px);
		height: 100%;
		border: none;
		outline: none;
		padding-left: 8px;
		font-size: 15px;
	}
`

const Clear = styled.span`
position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 13px;
	height: 13px;
	right: 1px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

&::before{
	content: '';
	position: absolute;
	width: 1px;
	height: 13px;
	background: #999;
	transform: rotate(45deg);
}

&::after{
	content: '';
	position: absolute;
	width: 1px;
	height: 13px;
	background: #999;
	transform: rotate(315deg);
}
`

interface Iprops {
	isActive: boolean
	children?: ReactNode
}

const Search = () => {
	const [isActive, setIsActive] = useState(false)
	const search = useInput()

	return <StyledSearch isActive={isActive}>
		<div onClick={() => setIsActive(!isActive)}></div>
		<span className="search">
			<input
				type="text"
				placeholder='Search'
				{...search}
			/>
			<Clear onClick={() => search.reset()} />
		</span>
	</StyledSearch>
}

export default Search