import styled from 'styled-components'

export const Padding = styled.div`
  padding: 1.4rem 0;
  display: flex;
  gap: 1.6rem;
`

export const SubTabs = styled.div`
  padding-right: 1.6rem;
  border-right: 1px solid #efefef;
  min-width: 120px;
  max-width: 192px;
  width: 20%;
`

export const SubTab = styled.div<{ active: 1 | 0 }>`
  padding: 0.6rem  1rem;
  cursor: pointer;
  color: ${ props => props.active ? 'white' : 'black' };
  background-color: ${ props => props.active ? '#306F7D' : 'white' };
  border-radius: 6px;
  font-weight: ${ props => props.active ? 'bold' : '' };
`
