import styled from 'styled-components';

export const ContentWrapper = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: minmax(120px, 200px) auto;

	@media(max-width:550px){
		grid-template-columns: 60px auto };
	}
`;